# AWS Signature V4 signing

[AWS Signature V4 공식 문서](https://docs.aws.amazon.com/ko_kr/general/latest/gr/signature-version-4.html)

AWS Signature V4는 HTTP로 보낸 AWS 요청을 추가로 인증하는 프로세스이다.

AWS Command Line Interface 또는 AWS SDK 중 하나를 사용하여 요청할 경우, AWS의 Access Key와 Secret Key를 사용하여 자동으로 서명이 생성된다.
AWS 서비스 액세스에 대한 HTTP 요청을 수동으로 생성할 경우, 서명을 직접 생성해야 한다.

## Signature V4 생성 절차

1. Canonical Request 생성
2. Canonical Request와 추가 metadata를 사용하여 String To Sign 생성
3. AWS Secret Key를 사용하여 Sign Key 생성
4. String To Sign과 Sign Key를 사용하여 Signature 생성
5. HTTP 요청 헤더에 Signature를 추가

## 설명

**이 repository의 소스는 signature와 header를 생성하여 콘솔에 출력만 합니다.**

**AWS 서비스에 활용하려면 return되는 signature와 header를 HTTP 요청에 활용하시기 바랍니다.**

## 사용 방법

### 1. repository 클론 및 패키지 설치

```bash
git clone https://github.com/gsphyo91/aws-signature-v4.git
cd aws-signature-v4

npm install
```

### 2. 정보 입력

```javascript
// index.js
const HOST_URL = "전송할 호스트 URL 주소 입력";
const URI = "전송할 API의 URI를 입력";
const ACCESS_KEY = "AWS Access Key 입력";
const SECRET_KEY = "AWS Secret Key 입력";
const REGION = "요청을 전송하는 Region 입력";
const SERVICE = "대상 서비스 입력";
const payload = "전송하는 요청의 body 입력, body가 없으면 ''으로 입력";

// Example
const HOST_URL = "api.us-west-2.service.io"
const URI = "ListStreamKeys";
const ACCESS_KEY = "abcdefghijklmnopqrstuvwxys"; // AWS access key 입력
const SECRET_KEY = "abcdefghijklmnopqrstuvwxys"; // AWS Secret Key 입력
const REGION = "us-west-2"; // Region 입력
const SERVICE = "service"; // Service 입력
const payload = '{"key":"value"}';
```

### 3. 실행

```bash
node index.js
```

## Documents

[프로그래밍 언어별 서명 생성 예시](https://docs.aws.amazon.com/ko_kr/general/latest/gr/signature-v4-examples.html)
