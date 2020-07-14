class RemoveUserIdsFromGroups < ActiveRecord::Migration[6.0]
  def change
    remove_column :groups, :user_ids, :integer
  end
end
