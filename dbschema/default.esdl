module default {
  type User {
    required property name -> str;
    property twitter_id -> int64 {
      constraint exclusive;
    };
  }
}
