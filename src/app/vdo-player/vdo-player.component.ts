import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-vdo-player',
  templateUrl: './vdo-player.component.html',
  styleUrls: ['./vdo-player.component.less']
})
export class VdoPlayerComponent implements OnInit {
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
    // currentVideo = this.videoItems[this.activeIndex];
    currentVideo: any = [];
    data: any;
    api: any = [];
    constructor(
      private httpClient : HttpClient
    ) { }
    ngOnInit(): void { 

      setInterval(() => {
        this.api = []
        this.httpClient.get("http://localhost:3000/api/v1/cst/video-playback")
        .subscribe((res: any) => {
  
          res.data.forEach((el: any) => {
            if(el.status == 'A'){
              this.api.push({
                name: el.title,
                src: el.fileSource,
                type: 'video/mp4'
              })
            }
            this.currentVideo = this.api[this.activeIndex];
          })
        })

        this.initVdo()
      }, 10000)
      
      console.log(this.api)
      // console.log(this.videoItems)
      
    }
    videoPlayerInit(data: any) {
      this.data = data;
      this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
      this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }
    nextVideo() {
      this.activeIndex++;
      if (this.activeIndex === this.api.length) {
        this.activeIndex = 0;
      }
      this.currentVideo = this.api[this.activeIndex];
    }
    initVdo() {
      this.data.play();
    }
    startPlaylistVdo(item: any, index: number) {
      this.activeIndex = index;
      this.currentVideo = item;
    }
}