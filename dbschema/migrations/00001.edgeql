CREATE MIGRATION m17k3h6a7tidah3jatwyuowcnpmynubaloocq7q6uu3iqksnrnzwya
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY name -> std::str;
  };
};
