// import { useState } from "react";

// const initialState = {
//   name: "",
//   business_registration_number: "",
//   email: "",
//   phone: "",
// };

// export default function MerchantForm({ onCreate }) {
//   const [formData, setFormData] = useState(initialState);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validate = () => {
//     if (!formData.name.trim()) return "Business name is required";
//     if (!formData.business_registration_number.trim())
//       return "Registration number is required";
//     if (!formData.email.includes("@"))
//       return "Please enter a valid email address";
//     if (!formData.phone.trim()) return "Phone number is required";
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const validationError = validate();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       setLoading(true);
//       await onCreate(formData);
//       setFormData(initialState); // reset form
//     } catch (err) {
//       setError("Failed to create merchant. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//       <h2 className="text-xl font-semibold mb-4">
//         Add New Merchant
//       </h2>

//       {error && (
//         <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Business Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             placeholder="Acme Ltd"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Registration Number
//           </label>
//           <input
//             type="text"
//             name="business_registration_number"
//             value={formData.business_registration_number}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             placeholder="BRN-001"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             placeholder="info@business.com"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             placeholder="+233XXXXXXXXX"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 rounded text-white font-medium transition ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Creating..." : "Create Merchant"}
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function MerchantForm({ onCreate, onClose }) {
  const [formData, setFormData] = useState({ name: "", business_registration_number: "", email: "", phone: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const { name, business_registration_number, email, phone } = formData;
    if (!name || !name.trim()) return "Business Name is required";
    if (!business_registration_number || !business_registration_number.trim()) return "Registration Number is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Email is invalid";
    const phoneRegex = /^[0-9+()\- ]{7,}$/;
    if (!phone || !phone.trim()) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Phone number is invalid";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await onCreate(formData);
      setFormData({ name: "", business_registration_number: "", email: "", phone: "" });
      setSuccess(true); // switch to success view
    } catch {
      setError("Failed to create merchant");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12 px-6">
        <h2 className="text-2xl font-semibold mb-4">Merchant Created Successfully!</h2>
        <p className="text-muted-foreground mb-6">Your new merchant has been added.</p>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-32 mx-auto"
          onClick={onClose} // close modal on Done
        >
          Done
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Create New Merchant</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-none mb-6 dark:bg-black text-foreground dark:text-white border border-border ">
        {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}

        <Input placeholder="Business Name" name="name" value={formData.name} onChange={handleChange} />
        <Input placeholder="Registration Number" name="business_registration_number" value={formData.business_registration_number} onChange={handleChange} />
        <Input placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
        <Input placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 mt-7 text-primary-foreground gap-2 cursor-pointer active:opacity-80 transition-opacity duration-150 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : (
            "Create Merchant"
          )}
        </Button>
      </form>
    </div>
  );
}
