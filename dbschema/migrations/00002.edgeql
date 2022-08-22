CREATE MIGRATION m15zihvhusedooeeqett6rjklymdurzpanpkmvxjlfpyxcmnlalpqq
    ONTO m17k3h6a7tidah3jatwyuowcnpmynubaloocq7q6uu3iqksnrnzwya
{
  ALTER TYPE default::User {
      CREATE PROPERTY twitter_id -> std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
