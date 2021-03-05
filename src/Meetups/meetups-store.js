import { writable } from "svelte/store";

const meetups = writable([
  {
    id: "m1",
    title: "Lorem Ipsum",
    subtitle: "Laborum laboris Lorem!",
    description:
      "Laborum laboris Lorem voluptate amet mollit aliquip mollit fugiat.",
    imageUrl:
      "https://assets.justinmind.com/wp-content/uploads/2018/11/Lorem-Ipsum-alternatives.png",
    address: "27th Lorem Ipsum, 32523 Lorem Ipsum",
    contactEmail: "code@test.com",
    isFavorite: false,
  },
  {
    id: "m2",
    title: "Lorem Ipsum II",
    subtitle: "Laborum laboris Lorem!",
    description:
      "Laborum laboris Lorem voluptate amet mollit aliquip mollit fugiat.",
    imageUrl:
      "https://assets.justinmind.com/wp-content/uploads/2018/11/Lorem-Ipsum-alternatives.png",
    address: "27th Lorem Ipsum, 32523 Lorem Ipsum",
    contactEmail: "code@test.com",
    isFavorite: true,
  },
  {
    id: "m3",
    title: "Lorem Ipsum III",
    subtitle: "Laborum laboris Lorem!",
    description:
      "Laborum laboris Lorem voluptate amet mollit aliquip mollit fugiat.",
    imageUrl:
      "https://assets.justinmind.com/wp-content/uploads/2018/11/Lorem-Ipsum-alternatives.png",
    address: "27th Lorem Ipsum, 32523 Lorem Ipsum",
    contactEmail: "code@test.com",
    isFavorite: false,
  },
  {
    id: "m4",
    title: "Lorem Ipsum IV",
    subtitle: "Laborum laboris Lorem!",
    description:
      "Laborum laboris Lorem voluptate amet mollit aliquip mollit fugiat.",
    imageUrl:
      "https://assets.justinmind.com/wp-content/uploads/2018/11/Lorem-Ipsum-alternatives.png",
    address: "27th Lorem Ipsum, 32523 Lorem Ipsum",
    contactEmail: "code@test.com",
    isFavorite: false,
  },
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false,
    };
    meetups.update((items) => {
      return [newMeetup, ...items];
    });
  },
  updateMeetup: (id, meetupData) => {
    meetups.update((items) => {
      const meetupIndex = items.findIndex((i) => i.id === id);
      // collapses (union) the objects using the spread operator.
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup: (id) => {
    meetups.update((items) => {
      return items.filter((i) => i.id !== id);
    });
  },
  toggleFavorite: (id) => {
    meetups.update((items) => {
      const updatedMeetup = { ...items.find((m) => m.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;

      // replace element in array
      const meetupIndex = items.findIndex((m) => m.id === id);
      const updatedMeetups = [...items];
      console.log(updatedMeetups);
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
};

export default customMeetupsStore;
