import PropTypes from "prop-types";

const DetialsCard = ({ title, count, src }) => {
  return (
    <div className="flex items-center rounded-md overflow-hidden sm:max-w-[420px] border bg-primary-50 hover-elavate">
      <div className="hidden basis-1/2 sx:block">
        <div className="size-full">
          <img className="object-cover h-52" src={src} />
        </div>
      </div>
      <div className="basis-full sx:basis-1/2">
        <div className="flex flex-col gap-2 mx-3">
          <h4 className="text-2xl font-medium font-heading text-text">
            {title}&apos;s Collection
          </h4>
          <ul className="py-2 space-y-1 text-base font-semibold font-body text-neutral-500">
            <li>Ethnic : {count.ethnic}</li>
            <li>Fashion : {count.fashon}</li>
            <li>Festive : {count.festive}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

DetialsCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
};

export default DetialsCard;
