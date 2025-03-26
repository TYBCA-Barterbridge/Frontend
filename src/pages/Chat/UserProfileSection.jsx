import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsX, BsPerson, BsChatSquareText, BsPersonX, BsPersonPlus, BsPencil, BsTrash, BsImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useRemoveFriendMutation } from "../../features/user/userApiSlice";
import { toast } from "react-hot-toast";
import {
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useAddMemberMutation,
  useRemoveMemberMutation,
  useLeaveGroupMutation,
} from "../../features/groups/groupsApiSlice";
import { selectGroup, updateGroup, deleteGroup } from "../../features/groups/groupSlice";
import { useSocket } from "../../contexts/SocketContext";

const UserProfileSection = ({ onClose, refetch, reconnect, friends }) => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const [removeFriend, { isLoading: removeFriendLoading }] = useRemoveFriendMutation();
  const [addMember, { isLoading: addMemberLoading }] = useAddMemberMutation();
  const [removeMember, { isLoading: removeMemberLoading }] = useRemoveMemberMutation();
  const [updateGroupMutation, { isLoading: updateGroupLoading }] = useUpdateGroupMutation();
  const [deleteGroupMutation, { isLoading: deleteGroupLoading }] = useDeleteGroupMutation();
  const [leaveGroupMutation, { isLoading: leaveGroupLoading }] = useLeaveGroupMutation();
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [removeMemberModal, setRemoveMemberModal] = useState(false);
  const [removeFriendModal, setRemoveFriendModal] = useState(false);
  const [leaveGroupModal, setLeaveGroupModal] = useState(false);
  const [editGroupModal, setEditGroupModal] = useState(false);
  const [deleteGroupModal, setDeleteGroupModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img1, setImg1] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMembersToRemove, setSelectedMembersToRemove] = useState([]);
  
  const handleMemberToggle = (userId) => {
    setSelectedMembers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleRemoveMemberToggle = (userId) => {
    setSelectedMembersToRemove(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  useEffect(() => {
    if (selectedChat?.isGroup) {
      dispatch(selectGroup(selectedChat));
      setTitle(selectedChat.title || "");
      setDescription(selectedChat.caption || "");
      setImg1(selectedChat.img || "");
    }
  }, [selectedChat, dispatch]);

  useEffect(() => {
    if (!socket) return;

    // Socket event listeners for group updates
    const handleGroupUpdate = ({ message, group }) => {
      toast.success(message);
      if (group) {
        dispatch(updateGroup(group));
        if (selectedChat?.group_id === group.group_id) {
          setTitle(group.title || "");
          setDescription(group.caption || "");
          setImg1(group.img || "");
        }
        refetch();
        reconnect();
      }
    };

    const handleGroupDelete = ({ message, group_id }) => {
      toast.success(message);
      if (group_id) {
        dispatch(deleteGroup(group_id));
        if (selectedChat?.group_id === group_id) {
          onClose();
          refetch();
          reconnect();
        }
      }
    };

    const handleRemovedFromGroup = ({ message, group_id }) => {
      toast.success(message);
      if (group_id) {
        dispatch(deleteGroup(group_id));
        if (selectedChat?.group_id === group_id) {
          onClose();
          refetch();
          reconnect();
        }
      }
    };

    const handleMemberRemoved = ({ message }) => {
      toast.success(message);
      refetch();
      reconnect();
    };

    const handleMemberAdded = ({ message }) => {
      toast.success(message);
      refetch();
      reconnect();
    };

    const handleLeftGroup = ({ message }) => {
      toast.success(message);
      refetch();
      reconnect();
      onClose();
    };

    // Register socket event listeners
    socket.on("group-updated", handleGroupUpdate);
    socket.on("group-deleted", handleGroupDelete);
    socket.on("removed-from-group", handleRemovedFromGroup);
    socket.on("member-removed", handleMemberRemoved);
    socket.on("member-added", handleMemberAdded);
    socket.on("left-group", handleLeftGroup);

    return () => {
      if (socket) {
        socket.off("group-updated", handleGroupUpdate);
        socket.off("group-deleted", handleGroupDelete);
        socket.off("removed-from-group", handleRemovedFromGroup);
        socket.off("member-removed", handleMemberRemoved);
        socket.off("member-added", handleMemberAdded);
        socket.off("left-group", handleLeftGroup);
      }
    };
  }, [socket, dispatch, selectedChat, onClose, refetch, reconnect]);

  const handleRemoveFriend = async () => {
    try {
      await removeFriend(selectedChat.user_id).unwrap();
      toast.success("Friend removed successfully");
      onClose();
      refetch();
      reconnect();
    } catch (error) {
      toast.error("Failed to remove friend");
    }
  };

  const handleRemoveMember = async () => {
    try {
      if (selectedMembersToRemove.length === 0) {
        toast.error("Please select at least one member to remove");
        return;
      }

      for (const userId of selectedMembersToRemove) {
        await removeMember({
          group_id: selectedChat.group_id,
          user_id: userId
        }).unwrap();
      }
      
      setSelectedMembersToRemove([]);
      setRemoveMemberModal(false);
      refetch();
      reconnect();
      toast.success("Members removed successfully");
    } catch (error) {
      toast.error("Failed to remove members");
    }
  };

  const handleAddMember = async () => {
    try {
      if (selectedMembers.length === 0) {
        toast.error("Please select at least one member to add");
        return;
      }

      await addMember({
        group_id: selectedChat.group_id,
        members: JSON.stringify(selectedMembers)
      }).unwrap();
      setSelectedMembers([]);
      setAddMemberModal(false);
      refetch();
      reconnect();
      toast.success("Members added successfully");
    } catch (error) {
      toast.error("Failed to add members");
    }
  };

  const handleEditGroup = async () => {
    try {
      const formData = new FormData();
      formData.append("group_id", selectedChat.group_id);
      formData.append("title", title);
      formData.append("description", description);
      if (img1 && img1.startsWith("data:")) {
        const response = await fetch(img1);
        const blob = await response.blob();
        formData.append("img1", blob);
      }

      const result = await updateGroupMutation(formData).unwrap();
      if (result.success) {
        dispatch(updateGroup(result.data));
        setEditGroupModal(false);
        refetch();
        reconnect();
        toast.success("Group updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update group");
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const result = await deleteGroupMutation(selectedChat.group_id).unwrap();
      if (result.success) {
        dispatch(deleteGroup(selectedChat.group_id));
        setDeleteGroupModal(false);
        onClose();
        refetch();
        reconnect();
        toast.success("Group deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete group");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroupMutation({ group_id: selectedChat.group_id }).unwrap();
      setLeaveGroupModal(false);
      refetch();
      reconnect();
      onClose();
      toast.success("Left group successfully");
    } catch (error) {
      toast.error("Failed to leave group");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed top-[90px] left-[22.5%] right-0 bg-white shadow-lg z-50"
      >
        <div className="w-full mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedChat?.isGroup ? "Group Profile" : "User Profile"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <BsX className="w-10 h-10 text-gray-600" />
            </button>
          </div>

          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-100">
                {selectedChat?.profile || selectedChat?.img ? (
                  <img
                    src={selectedChat.profile || selectedChat.img}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BsPerson className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              {selectedChat?.isGroup && (
                <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <BsImage className="w-5 h-5 text-white" />
                </label>
              )}
            </div>

            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    {selectedChat?.isGroup ? "Group Name" : "Username"}
                  </label>
                  <p className="mt-1 text-lg font-semibold text-gray-800">
                    {selectedChat?.username || selectedChat?.title}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    {selectedChat?.isGroup ? "Description" : "Bio"}
                  </label>
                  <p className="mt-1 text-gray-800">
                    {selectedChat?.bio || selectedChat?.caption || "No bio available"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {selectedChat?.isGroup && selectedChat?.isAdmin ? (
                    <>
                      <button
                        onClick={() => setEditGroupModal(true)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <BsPencil className="w-5 h-5" />
                        Edit Group
                      </button>
                      <button
                        onClick={() => setAddMemberModal(true)}
                        className="flex items-center gap-2 px-4 py-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <BsPersonPlus className="w-5 h-5" />
                        Add Members
                      </button>
                      <button
                        onClick={() => setRemoveMemberModal(true)}
                        className="flex items-center gap-2 px-4 py-2 text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                      >
                        <BsPersonX className="w-5 h-5" />
                        Remove Members
                      </button>
                      <button
                        onClick={() => setDeleteGroupModal(true)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <BsTrash className="w-5 h-5" />
                        Delete Group
                      </button>
                    </>
                  ) : (
                    selectedChat?.isGroup ? (
                      <button
                        onClick={() => setLeaveGroupModal(true)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <BsPersonX className="w-5 h-5" />
                        Leave Group
                      </button>
                    ) : (
                      <button
                        onClick={() => setRemoveFriendModal(true)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <BsPersonX className="w-5 h-5" />
                        Remove Friend
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {editGroupModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Edit Group</h3>
                <input
                  type="text"
                  placeholder="Group Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-4"
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditGroupModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditGroup}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {removeFriendModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Remove Friend</h3>
                <p>Are you sure you want to remove this friend?</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setRemoveFriendModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRemoveFriend}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {deleteGroupModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Delete Group</h3>
                <p>Are you sure you want to delete this group?</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setDeleteGroupModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteGroup}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {leaveGroupModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Leave Group</h3>
                <p>Are you sure you want to leave this group?</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setLeaveGroupModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLeaveGroup}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Leave
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {removeMemberModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Remove Members</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedChat.members?.filter(member => 
                    // Don't show the admin in the remove list
                    member.user_id !== selectedChat.admin_id
                  ).map((member) => (
                    <label
                      key={member.user_id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMembersToRemove.includes(member.user_id)}
                        onChange={() => handleRemoveMemberToggle(member.user_id)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                          {member.profile ? (
                            <img
                              src={member.profile}
                              alt={member.username}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BsPerson className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <span className="text-gray-800">{member.username}</span>
                      </div>
                    </label>
                  ))}
                  {selectedChat.members?.filter(member => member.user_id !== selectedChat.admin_id).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No members available to remove</p>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => {
                      setSelectedMembersToRemove([]);
                      setRemoveMemberModal(false);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRemoveMember}
                    disabled={selectedMembersToRemove.length === 0 || removeMemberLoading}
                    className={`px-4 py-2 bg-red-500 text-white rounded-lg transition-colors ${
                      selectedMembersToRemove.length === 0 || removeMemberLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-red-600'
                    }`}
                  >
                    {removeMemberLoading ? 'Removing...' : 'Remove Selected'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}  
          
          {addMemberModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Add Members</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {friends?.filter(friend => 
                    !selectedChat.members?.some(member => member.user_id === friend.user_id)
                  ).map((friend) => (
                    <label
                      key={friend.user_id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(friend.user_id)}
                        onChange={() => handleMemberToggle(friend.user_id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                          {friend.profile ? (
                            <img
                              src={friend.profile}
                              alt={friend.username}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BsPerson className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <span className="text-gray-800">{friend.username}</span>
                      </div>
                    </label>
                  ))}
                  {friends?.filter(friend => 
                    !selectedChat.members?.some(member => member.user_id === friend.user_id)
                  ).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No friends available to add</p>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => {
                      setSelectedMembers([]);
                      setAddMemberModal(false);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMember}
                    disabled={selectedMembers.length === 0 || addMemberLoading}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors ${
                      selectedMembers.length === 0 || addMemberLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-600'
                    }`}
                  >
                    {addMemberLoading ? 'Adding...' : 'Add Selected'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserProfileSection;
