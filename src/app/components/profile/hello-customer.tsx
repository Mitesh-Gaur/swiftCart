const HelloCustomer = ({
  user
}: any) => {
  return (
    <div className="bg-white text-gray-900 rounded-lg shadow p-6 py-2 mb-4 flex">
      <img
        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
        alt="userImage"
        className="mr-4 rounded-full w-16 h-16"
      />
      <div className="mt-2">
        <p>Hello,</p>
        <p className="capitalize"><strong>{user?.first_name} {user?.last_name}</strong></p>
      </div>
    </div> 
  );
}

export default HelloCustomer;