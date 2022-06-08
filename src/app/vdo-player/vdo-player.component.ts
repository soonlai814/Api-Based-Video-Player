// Change log
// Removed interval fetching to prevent unwanted playlist shuffle before finishing until end of playlist
//
// [Added]:
// 1. Random playlist maintain until the last video to refetch API
// 2. Interrupt the playlist if there is a tracking detected, then new playlist will be allocated
// End of Change log

import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { VgAPI } from 'ngx-videogular';
@Component({
  selector: 'app-vdo-player',
  templateUrl: './vdo-player.component.html',
  styleUrls: ['./vdo-player.component.less']
})
export class VdoPlayerComponent implements OnInit {
  playlist: any[] = [];
  // videoItems = [
  //     {
  //       name: 'Video one',
  //       src: 'http://static.videogular.com/assets/videos/videogular.mp4',
  //       type: 'video/mp4'
  //     },
  //     {
  //       name: 'Video two',
  //       src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
  //       type: 'video/mp4'
  //     },
  //     {
  //       name: 'Video three',
  //       src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
  //       type: 'video/mp4'
  //     }
  //   ];
    activeIndex = 0;
    count = 0;
    videoCount = 0;
    allowInterrupt = false;
    // currentVideo = this.videoItems[this.activeIndex];
    currentIndex = 0;
    currentItem: any = this.playlist[this.currentIndex];
    data: any;
    api!: VgApiService;
    newFeed: boolean = false;
    condition: boolean = true;
    billboardId: number = 1;
    queueId = 0;
    constructor(
      private httpClient : HttpClient,
      private cdr: ChangeDetectorRef,
      private route: ActivatedRoute
    ) {}

    get param() {
      return this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
      this.billboardId = Number(this.param);
      this.initVideoApi();
      this.interruptInterval();
      // console.log(this.videoItems)
    }

    switchBoard(requestedBillboardId: number) {

    }

    initVideoApi() {
      this.videoCount = 0;
      this.httpClient.get("http://localhost:3000/api/v1/task/video-feed?byBoardId="+this.billboardId)
      .subscribe((res: any) => {
        this.currentIndex = 0;
        this.playlist = [];
        const obj: any[] = [];
        this.count = res.data.length*10000;
        if(res.message == 'Random playable') {
          this.newFeed = false;
        } else {
          this.newFeed = true;
        };
        res.data.forEach((el: any, index: any) => {
          this.videoCount++;
          obj.push({
            index: index+1,
            title: el.title,
            src: el.fileSource,
            type: 'video/mp4',
            queueId: el.queueId,
          });

          this.playlist = obj;

          if (this.currentIndex != 0) {
            this.currentIndex = 0;
          } else {
            this.currentItem = this.playlist[this.currentIndex];
          }
          
          // this.condition = false;
        })
        console.log(this.videoCount);
        this.cdr.detectChanges();
      })
    }

    // Check if available tracked person in queue waiting [ if exist then interrupt ]
    interruptInterval() {
        setInterval(() => {
          this.interrupt();
        }, 10000)
    }

    interrupt() {
      // To interrupt a long playlist
      this.httpClient.get("http://localhost:3000/api/v1/task/check-queue/"+this.billboardId).subscribe((res: any) => {
        if(res.data > 0) {
          this.allowInterrupt = true;
          console.log('Interrupted, New Tracked Person Object');
        } else {
          this.allowInterrupt = false;
          console.log('Nothing to change');
        }
        console.log('data', res);
      })
    }

    onPlayerReady(api: VgApiService) {
      this.api = api;
      this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
      this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }
    nextVideo() {
      console.log('next', this.currentItem);
      this.httpClient.post("http://localhost:3000/api/v1/task/update-video-feed/"+this.currentItem.queueId, null).subscribe((res) => console.log('data', res));
      this.currentIndex++;

      if (this.currentIndex === this.playlist.length) {
        this.currentIndex = 0;
      }

      if(this.allowInterrupt) {
        this.initVideoApi();
      }

      if(this.currentItem.index == this.videoCount) {
        console.log('End of video, refetch')
        this.initVideoApi();
      }

      this.currentItem = this.playlist[this.currentIndex];
      this.playVideo();
    }
    playVideo() {
      this.api.play();
    }
    onClickPlaylistItem(item: any, index: number) {
      this.currentIndex = index;
      this.currentItem = item;
    }
}