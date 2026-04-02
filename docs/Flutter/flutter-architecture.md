---
title: Flutter 앱 아키텍처 패턴
tags: [flutter, architecture, clean-architecture]
date: 2026-03-25
---

# Flutter 앱 아키텍처 패턴

## 레이어 구조

```
lib/
├── data/          ← API, 로컬 DB
│   ├── datasource/
│   ├── model/
│   └── repository/
├── domain/        ← 비즈니스 로직
│   ├── entity/
│   ├── repository/
│   └── usecase/
├── presentation/  ← UI
│   ├── page/
│   ├── widget/
│   └── provider/
└── core/          ← 공통 유틸
```

## Repository 패턴

```dart
// domain/repository/user_repository.dart
abstract class UserRepository {
  Future<User> getUser(String id);
  Future<void> updateUser(User user);
}

// data/repository/user_repository_impl.dart
class UserRepositoryImpl implements UserRepository {
  final UserRemoteDataSource _remote;
  final UserLocalDataSource _local;

  UserRepositoryImpl(this._remote, this._local);

  @override
  Future<User> getUser(String id) async {
    try {
      return await _remote.getUser(id);
    } catch (_) {
      return await _local.getUser(id);
    }
  }
}
```

## UseCase

```dart
class GetUserUseCase {
  final UserRepository _repository;
  GetUserUseCase(this._repository);

  Future<User> execute(String id) => _repository.getUser(id);
}
```

## Riverpod과 조합

```dart
final getUserUseCaseProvider = Provider((ref) {
  return GetUserUseCase(ref.read(userRepositoryProvider));
});

final userProvider = FutureProvider.family<User, String>((ref, id) {
  return ref.read(getUserUseCaseProvider).execute(id);
});
```

## 핵심 원칙

> 의존성은 항상 안쪽(domain)을 향해야 한다. domain은 외부에 의존하지 않는다.
