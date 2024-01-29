import { CHARACTER_CLASESS } from '@/utils/memberUtils';

export default async function Characters() {
  return (
    <div>
      {CHARACTER_CLASESS.map(characterClass => (
        <div>
          <div className="border-b border-gray-700 pb-4 mt-7">
            <h1 className="font-medium text-xl text-gray-50 pb-2">{characterClass.humanName}</h1>
            <p className="text-gray-500">
              Number of classe variants is {characterClass.variants.length}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {characterClass.variants.map(characterVariant => (
              <div className="m-5">
                <img
                  width={60}
                  src={`/character_sprites/${characterClass.name}/${characterVariant}/${characterVariant}_1.png`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
