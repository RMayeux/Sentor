export const RepositorySearchInput = ({ setRepositoryNameFilter }) => {
  return (
    <div className="my-4 ml-12 flex flex-col">
      <input
        className="mt-4 border-b border-gray-900 p-2 pl-1 outline-none w-80"
        placeholder="Search by name ..."
        required
        onChange={(e) => setRepositoryNameFilter(e.target.value.toLowerCase())}
      />
    </div>
  );
};
