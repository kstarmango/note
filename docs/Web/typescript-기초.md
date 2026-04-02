---
title: TypeScript 기초 정리
tags: [web, typescript, javascript]
date: 2026-03-28
---

# TypeScript 기초 정리

## 기본 타입

```typescript
// 원시 타입
const name: string = 'DevNote'
const count: number = 42
const isActive: boolean = true

// 배열
const items: string[] = ['a', 'b', 'c']
const nums: Array<number> = [1, 2, 3]

// 튜플
const pair: [string, number] = ['age', 30]
```

## Interface vs Type

```typescript
// Interface — 객체 구조 정의, extends 가능
interface User {
  id: number
  name: string
  email?: string  // optional
}

// Type — 더 유연, union/intersection 가능
type Status = 'active' | 'inactive' | 'pending'
type AdminUser = User & { role: 'admin' }
```

## Generic

```typescript
function identity<T>(value: T): T {
  return value
}

identity<string>('hello')  // string
identity<number>(42)       // number

// 제약 조건
function getLength<T extends { length: number }>(value: T): number {
  return value.length
}
```

## 유틸리티 타입

```typescript
interface User {
  id: number
  name: string
  email: string
}

type PartialUser = Partial<User>       // 모든 필드 optional
type RequiredUser = Required<User>     // 모든 필드 required
type ReadonlyUser = Readonly<User>     // 모든 필드 readonly
type UserPreview = Pick<User, 'id' | 'name'>  // 일부 필드만
type WithoutEmail = Omit<User, 'email'>       // 일부 필드 제거
```

## 타입 가드

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

if (isString(input)) {
  console.log(input.toUpperCase())  // string으로 타입 좁혀짐
}
```
