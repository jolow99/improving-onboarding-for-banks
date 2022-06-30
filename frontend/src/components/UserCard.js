function UserCardSelected({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="grid rounded outline-dashed grid-cols-1 justify-items-center h-24 w-24 p-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-ellipsis overflow-hidden text-center text-sm">
        {name}
      </p>
    </button>
  );
}
function UserCardNotSelected({ name }) {
  return (
    <button className="grid grid-cols-1 justify-items-center h-24 w-24 p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <p className="text-ellipsis overflow-hidden text-center text-sm">
        {name}
      </p>
    </button>
  );
}

export { UserCardSelected, UserCardNotSelected };