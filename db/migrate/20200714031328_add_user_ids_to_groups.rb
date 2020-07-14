class AddUserIdsToGroups < ActiveRecord::Migration[6.0]
  def change
    add_column :groups, :user_ids, :integer
  end
end
