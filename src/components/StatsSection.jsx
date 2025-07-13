import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="bg-white py-16">
      <div className="mx-auto px-4 container">
        <div ref={ref} className="gap-8 grid grid-cols-2 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 font-bold text-emerald-600 text-3xl">
              {inView ? <CountUp end={500} duration={2} suffix="+" /> : '0+'}
            </div>
            <div className="text-gray-600">Properties</div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-bold text-emerald-600 text-3xl">
              {inView ? <CountUp end={1200} duration={2} separator="," suffix="+" /> : '0+'}
            </div>
            <div className="text-gray-600">Happy Tenants</div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-bold text-emerald-600 text-3xl">
              {inView ? <CountUp end={50} duration={2} suffix="+" /> : '0+'}
            </div>
            <div className="text-gray-600">Locations</div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-bold text-emerald-600 text-3xl">
              {inView ? <CountUp end={4.9} duration={2} decimals={1} /> : '0.0'}
            </div>
            <div className="text-gray-600">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
// In your Home component, use <StatsSection /> instead of the old stats section: