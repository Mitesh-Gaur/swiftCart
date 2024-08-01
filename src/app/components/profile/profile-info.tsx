const ProfileInfo = ({
  user
}: any) => {

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div>
        <div className="flex items-center py-5 px-6">
          <h2 className="font-semibold">Personal Information</h2>
          <small className="text-[#cb202d] ml-4"><button className="personal-information-edit-button">Edit</button></small>
        </div>

        <div className="flex items-center px-6">
          <div className="relative mb-4">
          <input type="text" id="first_name" name="first_name" placeholder="First Name" value={user?.first_name ?? ''} className="w-[12.25rem] bg-[#f0f5ff] rounded-lg text-base outline-none text-gray-400 placeholder:text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
          </div>
          <div className="relative mb-4 ml-3">
            <input type="text" id="last_name" name="last_name" placeholder="Last Name" value={user?.last_name ?? ''} className="w-[12.25rem] bg-[#f0f5ff] rounded-lg text-base outline-none text-gray-400 placeholder:text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
          </div>
        </div>
      </div>

      <div className="pb-3">
        <div className="flex items-center py-5 px-6">
          <h2 className="font-semibold">Email Address</h2>
          <small className="text-[#cb202d] ml-4"><button className="personal-information-edit-button">Edit</button></small>
        </div>

        <div className="relative mb-4 px-6">
          <input type="text" id="email" name="email" placeholder="Enter your email" value={user?.email ?? ''} className="w-1/2 bg-[#f0f5ff] rounded-lg text-base outline-none text-gray-400 placeholder:text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
        </div>
      </div>

      <div className="pb-3">
        <div className="flex items-center py-5 px-6">
          <h2 className="font-semibold">Mobile Number</h2>
          <small className="text-[#cb202d] ml-4"><button className="personal-information-edit-button">Edit</button></small>
        </div>

        <div className="relative mb-4 px-6">
          <input type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={ user?.phone_number ?? '' }
            className="w-1/2 bg-[#f0f5ff] rounded-lg text-base outline-none text-gray-400 placeholder:text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            readOnly />
        </div>
      </div>

      <div className="pb-3 pl-2">
        <small className="text-[#cb202d] ml-4"><button>Deactivate Account</button></small>
      </div>
    </div>
  );
}

export default ProfileInfo;