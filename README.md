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
|id|
|name|string|null: false|
|email|string|unique: true|
|password|string|null: false|

Association
- has_many :messeages
- has_many :groups
- has_many :groups, through: :groups_users

groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|
|group_name|string|null: false|

Association
- has_many :messeages
- has_many :users

groups_usersテーブル

|Column|Type|Optuions|
|------|----|--------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

Association
- belongs_to :group
- belongs_to :user

messeagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|intrger|null: false, foreign_key: true|

Association
- belongs_to :user
- belongs_to :group