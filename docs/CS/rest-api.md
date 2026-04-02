---
title: REST API 설계 원칙
tags: [CS, REST, API, 설계]
date: 2026-03-22
---

# REST API 설계 원칙

## REST란?

**RE**presentational **S**tate **T**ransfer. HTTP를 잘 활용하기 위한 아키텍처 스타일.

## 핵심 원칙

1. **자원(Resource)** — URI로 표현
2. **행위(Verb)** — HTTP 메서드로 표현
3. **표현(Representation)** — JSON, XML 등으로 주고받음

## URI 설계

```
# 좋은 예
GET    /users          # 목록
GET    /users/1        # 단건
POST   /users          # 생성
PUT    /users/1        # 전체 수정
PATCH  /users/1        # 부분 수정
DELETE /users/1        # 삭제

# 나쁜 예
GET  /getUsers
POST /createUser
GET  /users/delete/1
```

## 응답 구조

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "홍길동"
  },
  "message": null
}
```

```json
{
  "success": false,
  "data": null,
  "message": "사용자를 찾을 수 없습니다."
}
```

## 버전 관리

```
/api/v1/users
/api/v2/users
```

## 페이지네이션

```
GET /posts?page=1&size=20
GET /posts?cursor=abc123&size=20
```

> 커서 기반 페이지네이션이 오프셋 기반보다 대용량 데이터에 유리하다.
