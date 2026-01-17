// import { Form } from "react-router";

// import type { CreatorRecord } from "../data";

// export default function Creator() {
//   const Creator = {
//     first: "Your",
//     last: "Name",
//     avatar: "https://placecats.com/200/200",
//     twitter: "your_handle",
//     notes: "Some notes",
//     favorite: true,
//   };

//   return (
//     <div id="Creator">
//       <div>
//         <img
//           alt={`${Creator.first} ${Creator.last} avatar`}
//           key={Creator.avatar}
//           src={Creator.avatar}
//         />
//       </div>

//       <div>
//         <h1>
//           {Creator.first || Creator.last ? (
//             <>
//               {Creator.first} {Creator.last}
//             </>
//           ) : (
//             <i>No Name</i>
//           )}
//           <Favorite Creator={Creator} />
//         </h1>

//         {Creator.twitter ? (
//           <p>
//             <a
//               href={`https://twitter.com/${Creator.twitter}`}
//             >
//               {Creator.twitter}
//             </a>
//           </p>
//         ) : null}

//         {Creator.notes ? <p>{Creator.notes}</p> : null}

//         <div>
//           <Form action="edit">
//             <button type="submit">Edit</button>
//           </Form>

//           <Form
//             action="destroy"
//             method="post"
//             onSubmit={(event) => {
//               const response = confirm(
//                 "Please confirm you want to delete this record.",
//               );
//               if (!response) {
//                 event.preventDefault();
//               }
//             }}
//           >
//             <button type="submit">Delete</button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Favorite({
//   Creator,
// }: {
//   Creator: Pick<CreatorRecord, "favorite">;
// }) {
//   const favorite = Creator.favorite;

//   return (
//     <Form method="post">
//       <button
//         aria-label={
//           favorite
//             ? "Remove from favorites"
//             : "Add to favorites"
//         }
//         name="favorite"
//         value={favorite ? "false" : "true"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </Form>
//   );
// }
