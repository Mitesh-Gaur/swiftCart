const ManageAddress = ({
  user
}: any) => {

  return (
    <div className="bg-white rounded-lg shadow mb-6 pb-6">
      <div className="py-5 px-6">
        <h2 className="font-semibold mb-4">Manage Addresses</h2>
        <button className="text-[#cb202d] uppercase inline-flex items-center" id="open-modal-trigger">
          <img className="mr-[8px] filterWhite" width="24" height="24" src="https://www.svgrepo.com/show/532997/plus-large.svg" alt="add-address" />
          Add a new address
        </button>
      </div>

      <div className="py-5 px-6 border border-gray-200 rounded-lg mx-6">
        <div className="flex items-center mb-4">
          <h2 className="font-semibold mr-4">{user.first_name} {user.last_name}</h2>
          {!!user.phone_number && <h2 className="font-semibold">{user.phone_number}</h2>}
        </div>
        <p className="text-gray-900">{user.address}</p>
      </div>
    </div>
  );
}

export default ManageAddress;