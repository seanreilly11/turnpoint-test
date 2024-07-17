const UserTableHeadings = () => {
    return (
        <tr>
            <th scope="col" className="px-6 py-3">
                Client name
            </th>
            <th scope="col" className="px-6 py-3">
                Date of birth
            </th>
            <th scope="col" className="px-6 py-3">
                Primary funding source
            </th>
            <th scope="col" className="px-6 py-3">
                Primary language
            </th>
            <th scope="col" className="px-6 py-3">
                Secondary languages
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
        </tr>
    );
};

export default UserTableHeadings;
