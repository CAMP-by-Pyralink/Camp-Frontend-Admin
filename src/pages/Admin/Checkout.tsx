import { useNavigate } from "react-router-dom";
import discountIcon from "../../assets/svgs/ticket-discount.svg";
const Checkout = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-blue50 h-full w-full p-8">
      <div className="  bg-white py-14 px-20 shadow drop-shadow-md drop-shadow-white">
        <div className=" mb-12 mt-4 text-greyText">
          <h3
            className="  cursor-pointer font-medium  text-sm mb-2"
            onClick={() => navigate(-1)}
          >
            Go back
          </h3>
          <div className=" flex justify-between ">
            {/* Checkout form */}
            <div>
              <h1 className="  text-2xl font-semibold mb-1  tracking-[-2%] leading-[28.8px]">
                Checkout
              </h1>
              {/* form */}
              <form action="" className=" mt-8 space-y-6">
                {/* full name */}
                <div>
                  <label htmlFor="" className=" block text-sm font-medium mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className=" border border-[#D0D5DD] py-4 px-3 w-[634px] rounded-md  placeholder:text-[#98A2B3] "
                  />
                </div>
                {/* Email Address */}
                <div>
                  <label htmlFor="" className=" block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter email address"
                    className=" border border-[#D0D5DD] py-4 px-3 w-[634px] rounded-md  placeholder:text-[#98A2B3] "
                  />
                </div>
                {/* Phone number */}
                <div>
                  <label htmlFor="" className=" block text-sm font-medium mb-1">
                    Phone number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className=" border border-[#D0D5DD] py-4 px-3 w-[634px] rounded-md  placeholder:text-[#98A2B3] "
                  />
                </div>
                {/* Select country */}
                <div>
                  <label htmlFor="" className=" block text-sm font-medium mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Choose country"
                    className=" border border-[#D0D5DD] py-4 px-3 w-[634px] rounded-md  placeholder:text-[#98A2B3] "
                  />
                </div>
                {/* State, City & Zip-code */}
                <div className=" w-full flex items-center justify-between">
                  {/* state */}
                  <div>
                    <label
                      htmlFor=""
                      className=" block text-sm font-medium mb-1"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      placeholder="Enter state"
                      className=" border border-[#D0D5DD] py-4 px-3 rounded-md  placeholder:text-[#98A2B3] "
                    />
                  </div>
                  {/* City */}
                  <div>
                    <label
                      htmlFor=""
                      className=" block text-sm font-medium mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      className=" border border-[#D0D5DD] py-4 px-3 rounded-md  placeholder:text-[#98A2B3] "
                    />
                  </div>
                  {/* zip code */}
                  <div>
                    <label
                      htmlFor=""
                      className=" block text-sm font-medium mb-1"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter zip code"
                      className=" border border-[#D0D5DD] py-4 px-3 rounded-md  placeholder:text-[#98A2B3] "
                    />
                  </div>
                </div>
                {/*  */}
                <div className=" flex items-center gap-2">
                  <input type="checkbox" name="" id="" />
                  <p>I have read and agree to the Terms and Conditions.</p>
                </div>
              </form>
            </div>
            {/* Pay */}
            <div className=" basis-[40%]">
              <p className=" mb-1">Deep web monitoring premium access</p>
              <h1 className="  font-semibold mb-8  tracking-[-2%] leading-[28.8px]">
                $20.00
              </h1>
              {/* Payment details */}
              <div className=" space-y-4">
                {/* discount */}
                <div className=" relative">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className=" w-full border border-[#D0D5DD] py-4 pl-12 rounded-md  placeholder:text-[#98A2B3] "
                  />
                  <div className=" absolute top-[30%] px-4 flex items-center justify-between w-full">
                    <img src={discountIcon} alt="" />
                    <h1 className=" text-primary500">Apply</h1>
                  </div>
                </div>
                {/*  */}
                <div className=" space-y-4">
                  {/* Subtotal */}
                  <div className=" flex items-center justify-between text-sm text-black">
                    <h2 className=" text-[#98A2B3]">Subtotal</h2>
                    <h2 className=" font-semibold">$45.00</h2>
                  </div>
                  {/* shipping */}
                  <div className=" flex items-center justify-between text-sm text-black">
                    <h2 className=" text-[#98A2B3]">Shipping</h2>
                    <h2 className=" font-semibold">$5.00</h2>
                  </div>
                  {/* Discount */}
                  <div className=" flex items-center justify-between text-sm text-black">
                    <h2 className=" text-[#98A2B3]">Discount</h2>
                    <h2 className=" font-semibold">-$10.00</h2>
                  </div>
                  {/* Total */}
                  <div className=" flex items-center justify-between text-sm text-black mb-4">
                    <h2 className=" text-base">Total</h2>
                    <h2 className=" font-semibold">$40.00</h2>
                  </div>
                  {/* Button */}
                  <button className=" w-full bg-primary500 mt3 text-white font-semibold py-3  px-4 rounded-md">
                    Pay now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
