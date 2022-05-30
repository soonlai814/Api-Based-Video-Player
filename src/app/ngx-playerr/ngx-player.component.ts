import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IVideoConfig, IVideoSource } from 'ngx-video-list-player';
@Component({
  selector: 'app-ngx-player',
  templateUrl: './ngx-player.component.html',
  styleUrls: ['./ngx-player.component.less']
})
export class NgxPlayerComponent implements OnInit {

  
  config!: IVideoConfig;
  source: IVideoSource[] = [
    {
        src: "https://innovixdev.blob.core.windows.net/upload-file/2.mp4",
        videoName: "Coca",
        artist: "Cola",
    },{
        src: `https://innovixdev.blob.core.windows.net/upload-file/1.mp4`,
        videoName: "Talking To Myself [Official Music Video]",
        artist: "Linkin Park"
    }];
  activeIndex = 0;
  // currentVideo = this.videoItems[this.activeIndex];
  currentVideo: any = [];
  data: any;
  api: any = [];
  newFeed: boolean = false;
  constructor(
    private httpClient : HttpClient,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    
    this.initVideoApi();
    this.config = {
      sources: this.source,
      isFirstVideoAutoPlay: false,
      isAutoPlay: false,
      isVideoLoader: false  
    };

    // console.log(this.videoItems)
  }

  initVideoApi() {
    
    this.httpClient.get("http://20.216.28.177/api/v1/core-strategy/video-playback")
    .subscribe((res: any) => {
      const obj: IVideoSource[] = [];
      res.data.forEach((el: any) => {
          obj.push({
            videoName: el.title,
            src: el.fileSource,
            type: 'video/mp4'
          })
      })
      this.source = obj;

      this.config = {
        sources: this.source,
        isFirstVideoAutoPlay: true,
        isAutoPlay: true,
        isVideoLoader: false  
      };
    })
  }

  test(e: any) {
    console.log(e)
  }

  videoPlayerInit(data: any) {
    this.data = data;
    this.data.play();
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