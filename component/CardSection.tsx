import Image from "next/image";

interface Card {
  heading: string;
  description: string;
  image: string;
}

interface CardSectionProps {
  cards: Card[];
  sectionTitle?: string;
}

export default function CardSection({ cards, sectionTitle }: CardSectionProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      {sectionTitle && (
        <h2 className="text-3xl font-bold text-center mb-10">{sectionTitle}</h2>
      )}

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-1 items-center justify-center text-center "
          >
            {card.image && (
              <div className="relative w-fit h-fit mb-2">
                <Image
                  src={card.image}
                  alt={card.heading}
                  fill
                  style={{ objectFit: "cover" }}
                  className="!relative !w-10 !h-10" 
                />
              </div>
            )}
              <h3 className="text-[15px] font-semibold uppercase">{card.heading}</h3>
              <p className="text-gray-600 text-[13px]">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
