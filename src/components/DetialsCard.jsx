import PropTypes from "prop-types";

const DetialsCard = ({ title, count, src }) => {
  return (
    <div className="flex items-center rounded-md overflow-hidden sm:max-w-[420px] border bg-primary-50 hover-elavate">
      <div className="basis-1/2 hidden sx:block">
        <div className="size-full">
          <img className="object-cover h-52" src={src} />
        </div>
      </div>
      <div className="basis-full sx:basis-1/2">
        <div className="flex flex-col gap-2 mx-3">
          <h4 className="font-heading text-2xl font-medium text-text">
            {title}&apos;s Collection
          </h4>
          <ul className="space-y-1 font-body font-semibold text-base text-neutral-500 py-2">
            <li>Ethinic : {count.ethnic}</li>
            <li>Fashon : {count.fashon}</li>
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
