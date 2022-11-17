export function BookSortingSelect () {
  return (
    <div className="col-3 float-right justify-content-end">
        <select className="data-filtering-criteria form-control">
            <option disabled selected>Select sorting criteria</option>
            <option value="author">Author name</option>
            <option value="date">Publish date</option>
        </select>
    </div>
  )
}
