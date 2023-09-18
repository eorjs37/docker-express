# 이미지 빌드
```bash
docker build . -t eorjs37/node-web-app

```

# 이미지 실행
```bash
docker run -p 3000:3000 --network test-network -d eorjs37/node-web-app
```

```bash
docker run -p 3000:3000 --network test-network  --add-host=host.docker.internal:host-gateway -d eorjs37/node-web-app 
```