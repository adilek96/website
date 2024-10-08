import { ticketsAction } from "@/app/actions/ticketsAction";
import NewsLatterBox from "./NewsLatterBox";

const serviceType = [
  "Help to choose",
  "Desing",
  "Installation and setting",
  "Repairing",
  "Monthly service",
  "Software setting",
];

export default function Contact({ session, page }: any) {
  return (
    <section id="service" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] px-8 py-11 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
                "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via phone.
              </p>
              <form action={ticketsAction}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="tname"
                        autoComplete="name"
                        required
                        defaultValue={
                          (session !== null &&
                            (session.user as { name?: string }).name) ||
                          ""
                        }
                        placeholder="Enter your name"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="phone"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="tphone"
                        autoComplete="tel"
                        pattern="\+994\d{9}"
                        placeholder="+994"
                        required
                        defaultValue={
                          (session !== null &&
                            (session.user as { phone?: string }).phone) ||
                          ""
                        }
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="type"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Service type
                      </label>
                      <select
                        name="type"
                        id="type"
                        autoComplete="off"
                        required
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
                      >
                        {serviceType.map((item, i) => (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={5}
                        placeholder="Enter your Message"
                        className="w-full resize-none rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
                      ></textarea>
                    </div>
                  </div>
                  <input
                    type="hidden"
                    name="userId"
                    defaultValue={
                      (session !== null &&
                        (session.user as { id?: string }).id) ||
                      ""
                    }
                    readOnly
                  />

                  <div className="w-full px-4">
                    <button className="rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                      Submit Ticket
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {page === "Home" ? (
            <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
              <NewsLatterBox />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
