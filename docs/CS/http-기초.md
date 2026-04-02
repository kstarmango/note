---
title: HTTP 기초 정리
tags: [CS, http, 네트워크]
date: 2026-03-15
---

# HTTP 기초 정리

웹 개발의 기반이 되는 HTTP 프로토콜을 정리합니다.

## HTTP란?

HyperText Transfer Protocol. 클라이언트-서버 간 데이터를 주고받는 프로토콜.

- **무상태(Stateless)**: 요청 간 상태를 유지하지 않음
- **비연결성**: 요청/응답 후 연결 종료 (HTTP/1.1부터는 Keep-Alive로 연결 유지 가능)

## HTTP 메서드

| 메서드 | 설명 | 멱등성 |
|--------|------|--------|
| GET | 리소스 조회 | O |
| POST | 리소스 생성 | X |
| PUT | 리소스 전체 수정 | O |
| PATCH | 리소스 부분 수정 | X |
| DELETE | 리소스 삭제 | O |

## 상태 코드

### 2xx 성공
- `200 OK` — 요청 성공
- `201 Created` — 리소스 생성 성공
- `204 No Content` — 성공, 반환 데이터 없음

### 4xx 클라이언트 오류
- `400 Bad Request` — 잘못된 요청
- `401 Unauthorized` — 인증 필요
- `403 Forbidden` — 권한 없음
- `404 Not Found` — 리소스 없음

### 5xx 서버 오류
- `500 Internal Server Error` — 서버 내부 오류
- `503 Service Unavailable` — 서버 일시 불가

## HTTP vs HTTPS

> HTTPS = HTTP + TLS 암호화. 데이터를 암호화해서 전송.

```
HTTP:  클라이언트 → (평문) → 서버
HTTPS: 클라이언트 → (암호화) → 서버
```

## 헤더 주요 항목

```http
Content-Type: application/json
Authorization: Bearer eyJhbGci...
Cache-Control: no-cache
```
