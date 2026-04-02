---
title: Riverpod 상태관리 정리
tags: [flutter, riverpod, 상태관리]
date: 2026-03-20
---

# Riverpod 상태관리 정리

Flutter에서 가장 많이 쓰이는 상태관리 라이브러리 중 하나인 Riverpod을 정리합니다.

## Provider 종류

### Provider
단순한 값을 제공할 때 사용. 상태가 변하지 않는 경우.

```dart
final helloProvider = Provider<String>((ref) => 'Hello, World!');
```

### StateProvider
간단한 상태를 읽고 쓸 때 사용.

```dart
final counterProvider = StateProvider<int>((ref) => 0);

// 읽기
final count = ref.watch(counterProvider);

// 쓰기
ref.read(counterProvider.notifier).state++;
```

### NotifierProvider
복잡한 상태 로직을 다룰 때 사용. 권장 방식.

```dart
class CounterNotifier extends Notifier<int> {
  @override
  int build() => 0;

  void increment() => state++;
  void decrement() => state--;
}

final counterProvider = NotifierProvider<CounterNotifier, int>(
  CounterNotifier.new,
);
```

### AsyncNotifierProvider
비동기 상태를 다룰 때 사용.

```dart
class UserNotifier extends AsyncNotifier<User> {
  @override
  Future<User> build() async {
    return await fetchUser();
  }
}
```

## ref 사용법

| 메서드 | 설명 |
|--------|------|
| `ref.watch()` | 상태를 구독, 변경 시 리빌드 |
| `ref.read()` | 한 번만 읽기, 리빌드 없음 |
| `ref.listen()` | 변경 감지 후 콜백 실행 |

## 주의사항

> `ref.read()`는 이벤트 핸들러 안에서만 사용. `build()` 안에서는 `ref.watch()` 사용.

## 참고

- [Riverpod 공식 문서](https://riverpod.dev)
