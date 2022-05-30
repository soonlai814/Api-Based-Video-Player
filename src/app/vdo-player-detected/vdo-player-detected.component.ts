import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { VgAPI } from 'ngx-videogular';
@Component({
  selector: 'app-vdo-player-detected',
  templateUrl: './vdo-player-detected.component.html',
  styleUrls: ['./vdo-player-detected.component.less']
})
export class VdoPlayerDetectedComponent implements OnInit {
  playlist = [    {
    title: 'Pale Blue Dot',
    src: 'http://static.videogular.com/assets/videos/videogular.mp4',
    type: 'video/mp4'
  },
  {
    title: 'Big Buck Bunny',
    src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
    type: 'video/mp4'
  },
  {
    title: 'Elephants Dream',
    src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
    type: 'video/mp4'
  }];
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
    // currentVideo = this.videoItems[this.activeIndex];
    currentIndex = 0;
    currentItem: any = this.playlist[this.currentIndex];
    data: any;
    api!: VgApiService;
    newFeed: boolean = false;
    condition: boolean = true;
    constructor(
      private httpClient : HttpClient,
      private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
      this.initVideoApi();
      this.initInterval();
      // console.log(this.videoItems)
    }

    initVideoApi() {
      this.httpClient.get("http://20.216.28.177/api/v1/cron-task/live-feed")
      .subscribe((res: any) => {
        this.playlist = [];
        const obj: any[] = [];
        this.count = res.data.length*10000;
        res.data.forEach((el: any, index: any) => {
          
            obj.push({
              title: el.title,
              src: el.fileSource,
              type: 'video/mp4'
            })
          this.playlist = obj;
          this.currentItem = this.playlist[this.currentIndex];
          
          // this.condition = false;
        })
        this.cdr.detectChanges();
      })
    }

    initInterval() {
      const count = this.count;
      setInterval(() => {
        this.initVideoApi();
        console.log('refreshed')
      }, 10000)
    }

    onPlayerReady(api: VgApiService) {
      this.api = api;
      this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
      this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }
    nextVideo() {
      this.currentIndex++;

      if (this.currentIndex === this.playlist.length) {
        this.currentIndex = 0;
      }

      this.currentItem = this.playlist[this.currentIndex];
    }
    playVideo() {
      this.api.play();
    }
    onClickPlaylistItem(item: any, index: number) {
      this.currentIndex = index;
      this.currentItem = item;
    }
}