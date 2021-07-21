export const RepositorySearchInput = ({setRepositoryNameFilter}) => {
  return (
    <div className="my-4 ml-4 flex flex-col ">
      <label className="text-lg">Filter projects by name</label>
      <input
        className="mt-4 py-3 pl-3 bg-white rounded-md outline-none border border-gray-300 w-80"
        placeholder="Repository name"
        required
        onChange={(e) => setRepositoryNameFilter(e.target.value.toLowerCase())}
      />
    </div>
  );
};
