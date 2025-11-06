// import { dbConnect } from "@/lib/db";
// import Cabin from "@/models/Cabin";
// import Booking from "@/models/Booking";
// import Guest from "@/models/Guest";
// import Setting from "@/models/Settings";
// import { Types } from "mongoose";

// async function seed() {
//   await dbConnect();
//   console.log("✅ Connected to DB");

//   // Optional: Clear existing data
//   await Promise.all([
//     Cabin.deleteMany(),
//     Booking.deleteMany(),
//     Guest.deleteMany(),
//     Setting.deleteMany(),
//   ]);
//   console.log("🗑️ Cleared old data");

//   // Seed Guests
//   const guests = await Guest.insertMany([
//     { _id: new Types.ObjectId(), fullName: "John Doe", email: "john@example.com", nationalID: "12345678", country: "USA" },
//     { _id: new Types.ObjectId(), fullName: "Jane Smith", email: "jane@example.com", nationalID: "87654321", country: "UK" },
//   ]);

//   // Seed Cabins
//   const cabins = await Cabin.insertMany([
//     { _id: new Types.ObjectId(), name: "Ocean View", maxCapacity: 4, regularPrice: 200, discount: 10, image: "/images/ocean.jpg", description: "Sea-facing cabin" },
//     { _id: new Types.ObjectId(), name: "Mountain Cabin", maxCapacity: 6, regularPrice: 250, discount: 0, image: "/images/mountain.jpg", description: "Cozy mountain cabin" },
//   ]);

//   // Seed Bookings
//   await Booking.insertMany([
//     {
//       _id: new Types.ObjectId(),
//       cabinId: cabins[0]._id!,
//       guestId: guests[0]._id!,
//       numGuests: 2,
//       numNights: 3,
//       startDate: new Date(),
//       endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
//       cabinPrice: cabins[0].regularPrice,
//       totalPrice: cabins[0].regularPrice * 3,
//       hasBreakfast: true,
//       isPaid: false,
//       observationText: "Near the window",
//       status: "confirmed",
//       createdAt: new Date(),
//     },
//   ]);

//   // Seed Settings
//   await Setting.create({
//     breakfastPrice: 25,
//     minBookingLength: 1,
//     maxBookingLength: 14,
//     maxGuestsPerBooking: 6,
//   });

//   console.log("🌱 Database seeded successfully!");
//   process.exit(0);
// }

// seed().catch((err) => {
//   console.error("❌ Seeding failed:", err);
//   process.exit(1);
// });

// import { NextRequest } from "next/server";
// import { dbConnect } from "@/lib/db";
// import Cabin from "@/models/Cabin";
// import Booking from "@/models/Booking";
// import Guest from "@/models/Guest";
// import Setting from "@/models/Settings";
// import { Types } from "mongoose";

// export async function GET(req: NextRequest) {
//   try {
//     // Connect to DB
//     await dbConnect();

//     // --- Seed Guests ---
//     const guests = await Guest.insertMany([
//       {
//         _id: new Types.ObjectId(),
//         fullName: "Layek Miah",
//         email: "layek@example.com",
//         nationality: "Bangladesh",
//         nationalID: "12345678",
//         countryFlag: "https://flagcdn.com/bd.svg",
//       },
//       {
//         _id: new Types.ObjectId(),
//         fullName: "Rasel Miah",
//         email: "rasel@example.com",
//         nationality: "America",
//         nationalID: "87654321",
//         countryFlag: "https://flagcdn.com/us.svg",
//       },
//     ]);

//     // --- Seed Cabins ---
//     const cabins = await Cabin.insertMany([
//       {
//         _id: new Types.ObjectId(),
//         name: "008",
//         maxCapacity: 18,
//         regularPrice: 200,
//         discount: 50,
//         image:
//           "https://tevleutvljemsamysqqh.supabase.co/storage/v1/object/public/cabin-images/0.9493105121233085-cabin-006.jpg",
//         description: "Small luxury cabin in the woods",
//       },
//       {
//         _id: new Types.ObjectId(),
//         name: "003",
//         maxCapacity: 6,
//         regularPrice: 250,
//         discount: 0,
//         image:
//           "https://tevleutvljemsamysqqh.supabase.co/storage/v1/object/public/cabin-images/0.14453746231530396-cabin-003.jpg",
//         description: "Good for couples getaway",
//       },
//       {
//         _id: new Types.ObjectId(),
//         name: "009",
//         maxCapacity: 6,
//         regularPrice: 250,
//         discount: 0,
//         image:
//           "https://tevleutvljemsamysqqh.supabase.co/storage/v1/object/public/cabin-images/0.12620731983339928-cabin-005.jpg",
//         description: "Good for couples getaway",
//       },
//       {
//         _id: new Types.ObjectId(),
//         name: "002",
//         maxCapacity: 6,
//         regularPrice: 250,
//         discount: 0,
//         image:
//           "https://tevleutvljemsamysqqh.supabase.co/storage/v1/object/public/cabin-images/0.14453746231530396-cabin-003.jpg",
//         description: "Good for couples getaway",
//       },
//       {
//         _id: new Types.ObjectId(),
//         name: "004",
//         maxCapacity: 6,
//         regularPrice: 250,
//         discount: 0,
//         image:
//           "https://tevleutvljemsamysqqh.supabase.co/storage/v1/object/public/cabin-images/0.14453746231530396-cabin-003.jpg",
//         description: "Good for couples getaway",
//       },
//     ]);

//     // --- Seed Bookings ---
//     await Booking.insertMany([
//       {
//         _id: new Types.ObjectId(),
//         cabinId: cabins[0]._id!,
//         guestId: guests[0]._id!,
//         numGuests: 2,
//         numNights: 3,
//         startDate: new Date(),
//         endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
//         cabinPrice: cabins[0].regularPrice,
//         totalPrice: cabins[0].regularPrice * 3,
//         hasBreakfast: true,
//         isPaid: false,
//         observationText: "Near the window",
//         status: "confirmed",
//         createdAt: new Date(),
//       },
//       {
//         _id: new Types.ObjectId(),
//         cabinId: cabins[1]._id!,
//         guestId: guests[0]._id!,
//         numGuests: 5,
//         numNights: 2,
//         startDate: new Date(),
//         endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
//         cabinPrice: cabins[1].regularPrice,
//         totalPrice: cabins[1].regularPrice * 2,
//         hasBreakfast: true,
//         isPaid: false,
//         observationText: "Near the window",
//         status: "confirmed",
//         createdAt: new Date(),
//       },
//       {
//         _id: new Types.ObjectId(),
//         cabinId: cabins[2]._id!,
//         guestId: guests[0]._id!,
//         numGuests: 2,
//         numNights: 5,
//         startDate: new Date(),
//         endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
//         cabinPrice: cabins[2].regularPrice,
//         totalPrice: cabins[2].regularPrice * 5,
//         hasBreakfast: true,
//         isPaid: false,
//         observationText: "Near the window",
//         status: "confirmed",
//         createdAt: new Date(),
//       },
//       {
//         _id: new Types.ObjectId(),
//         cabinId: cabins[3]._id!,
//         guestId: guests[0]._id!,
//         numGuests: 2,
//         numNights: 7,
//         startDate: new Date(),
//         endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
//         cabinPrice: cabins[3].regularPrice,
//         totalPrice: cabins[3].regularPrice * 7,
//         hasBreakfast: true,
//         isPaid: false,
//         observationText: "Near the window",
//         status: "confirmed",
//         createdAt: new Date(),
//       },
//     ]);

//     // --- Seed Settings ---
//     await Setting.create({
//       breakfastPrice: 25,
//       minBookingLength: 1,
//       maxBookingLength: 14,
//       maxGuestsPerBooking: 6,
//     });

//     return Response.json({ message: "🌱 Database seeded successfully!" });
//   } catch (error) {
//     console.error("Seeding error:", error);
//     return Response.json(
//       { error: "❌ Failed to seed database" },
//       { status: 500 }
//     );
//   }
// }
