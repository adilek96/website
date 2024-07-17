import Breadcrumb from "@/components/Common/Breadcrumb";
import SectionTitle from "@/components/Common/SectionTitle";
import Contact from "@/components/Contact";
import SingleFeature from "@/components/Features/SingleFeature";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import { Feature } from "@/types/feature";
import Settings from "@/public/images/service/Settings";
import Help from "@/public/images/service/Help";
import Desing from "@/public/images/service/Desing";
import Install from "@/public/images/service/Install";
import Repare from "@/public/images/service/Repare";
import ServicesImg from "@/public/images/service/ServicesImg";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <Help />,
    title: "Help to chose",
    paragraph:
      "Don't know what to choose? Are you lost in the huge variety of products? We will help you make the right choice!",
  },
  {
    id: 2,
    icon: <Desing />,
    title: "Designing security systems",
    paragraph:
      "Designing security systems is a complex process that requires a professional approach and knowledge of modern technologies. Our team of experts will help you develop a customized solution that fully meets your requirements and site specifics.",
  },
  {
    id: 3,
    icon: <Install />,
    title: "Installation of security systems",
    paragraph:
      "Correct installation of a security system is the key to its effective operation and your safety. Our team of professionals is ready to perform a full range of work on the installation of security systems of any complexity.",
  },
  {
    id: 4,
    icon: <Settings />,
    title: "Setting up software",
    paragraph:
      "After installing the equipment, setting up the software plays a key role in ensuring the effective operation of the security system. Our team of professionals is ready to offer you a full range of software configuration services to ensure that your system works flawlessly and meets your requirements.",
  },
  {
    id: 5,
    icon: <Repare />,
    title: "Security systems repair",
    paragraph:
      "Our company offers comprehensive services for the repair of security systems, ensuring their uninterrupted and reliable operation. Regardless of the complexity of the breakdown, our specialists are ready to quickly fix any malfunctions and return your security system to working condition.",
  },
  {
    id: 6,
    icon: <ServicesImg />,
    title: "Service and Support",
    paragraph:
      "To ensure reliable and trouble-free operation of your security system, regular maintenance is necessary. Our company offers monthly maintenance services to ensure your security system always remains in excellent condition.",
  },
];

const Services = async () => {
  const session = await getServerSession(authConfig);
  return (
    <>
      <Breadcrumb
        pageName="Services"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <section
        id="features"
        className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <SectionTitle
            title="Our services"
            paragraph="We will do everything for your safety"
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
      <Contact session={session} page={"Services"} />
    </>
  );
};

export default Services;
