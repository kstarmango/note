---
title: Dart 비동기 프로그래밍
tags: [flutter, dart, async, future, stream]
date: 2026-03-18
---

# Dart 비동기 프로그래밍

## Future

비동기 작업의 결과를 나타내는 객체.

```dart
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 1));
  return 'data';
}

// 사용
final result = await fetchData();
print(result); // data
```

## async / await

```dart
Future<void> loadUser() async {
  try {
    final user = await userRepository.getUser('123');
    print(user.name);
  } catch (e) {
    print('에러: $e');
  }
}
```

## Stream

연속적인 데이터를 다룰 때 사용.

```dart
Stream<int> counter() async* {
  for (int i = 0; i < 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

// 구독
counter().listen((value) => print(value));

// await for
await for (final value in counter()) {
  print(value);
}
```

## StreamController

```dart
final controller = StreamController<String>();

// 데이터 추가
controller.sink.add('hello');

// 구독
controller.stream.listen((data) => print(data));

// 반드시 닫기
controller.close();
```

## Future vs Stream

| | Future | Stream |
|--|--------|--------|
| 결과 수 | 1개 | 0개 이상 |
| 사용 예 | API 호출 | 실시간 데이터, WebSocket |
| 키워드 | `await` | `await for`, `listen` |
