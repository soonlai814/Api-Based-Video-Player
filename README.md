# Link to test
-- localhost:4200/board/{{ id }}

# Change Response to your local backend in
-- src/app/vdo-player/vdo-player.component.ts

```js
    initVideoApi() {
      this.httpClient.get("https://trial.innovix.ai/api/v1/task/video-feed?byBoardId="+this.billboardId)
```

# Api re-fetch interval of 10s
-- vdo-player.component.ts
-- inside function ngOnInit()
