import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function Profile() {
  const session = await getServerSession(authConfig);

  return (
    <>
      <section className="overflow-hidden pt-[180px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  My Profile
                </h2>
              </div>
            </div>
            <div>
              <h2>Profile of {session?.user?.name}</h2>
              {session?.user?.image && <img src={session.user.image} alt="" />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
