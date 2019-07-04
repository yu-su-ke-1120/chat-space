# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|unique: true|
|password|string|null: false|

Association
- has_many :messages
- has_many :groups
- has_many :groups_users
- has_many :groups, through: :groups_users

groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

Association
- has_many :messages
- has_many :users
- has_many :groups_users
- has_many :users, through: :groups_users

groups_usersテーブル

|Column|Type|Optuions|
|------|----|--------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

Association
- belongs_to :group
- belongs_to :user

messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

Association
- belongs_to :user
- belongs_to :group