import { useContext } from "react";
import UserCard from "../components/UserCard.jsx";
import { DashboardContext } from "../context/DashboardContext";

const Users = () => {
  const { users } = useContext(DashboardContext);

  return (
    <section className="overflow-x-hidden py-5">
      <h2 className="font-heading text-3xl font-semibold text-text mb-6">
        Current users
      </h2>
      <div className="flex flex-wrap gap-5">
        {users.map((item, i) => (
          <UserCard key={`user:${i}`} user={item} i={i} />
        ))}
      </div>
    </section>
  );
};

export default Users;