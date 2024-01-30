'use client';
import { Space } from 'antd';
import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { Profile } from '@/utils/supabase/types';
import { CHARACTER_CLASESS } from '@/utils/memberUtils';
import { MIDDLE_STYLE } from '@/constants';

type Props = {
  user: Profile;
};

const MemberCard = ({ user }: Props) => {
  const [characterVariant, setCharacterVariant] = useState<string>('');
  const [characterClass, setCharacterClass] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const generateMemberDna = async (inputString: string) => {
        // Use the SHA-256 hash function for demonstration purposes
        const hashBuffer = crypto.subtle.digest('SHA-256', new TextEncoder().encode(inputString));

        // Convert the hash buffer to an array of integers
        const hashArrayBuffer = await hashBuffer;
        const hashArray = Array.from(new Uint8Array(hashArrayBuffer));
        // Sum the array values and map it to a range
        const sum = hashArray.reduce((acc, value) => acc + value, 0);
        return { sum, hashArray };
      };

      const {
        sum: memberDna,
        hashArray: [firstNonce],
      } = await generateMemberDna(user.username || '');

      const characterClassNonce = (memberDna % CHARACTER_CLASESS.length) + 1;
      const characterClass = CHARACTER_CLASESS[characterClassNonce - 1];

      const variantNonce = ((memberDna * firstNonce) % characterClass.variants.length) + 1;
      const characterVariant = characterClass.variants[variantNonce - 1];

      setCharacterClass(characterClass.name);
      setCharacterVariant(characterVariant);
    };
    init();
  }, [user]);

  return (
    <div
      className="bg-stone-950 border border-gray-800 px-5 py-4"
      style={{ maxWidth: 450, width: '100%', ...MIDDLE_STYLE, justifyContent: 'space-between' }}>
      <Space size={20} style={{ width: '100%' }}>
        <Avatar className="w-10 h-10" src={user.avatar_url || ''} />
        <div>
          <h1 className="font-medium text-xl text-gray-50">{user.username}</h1>
          <p className="text-gray-500 text-sm">
            Community Rank: <span className="text-green-500 font-md">Nomad Level</span>
          </p>
        </div>
      </Space>
      <img
        className="ml-3"
        src={`/character_sprites/${characterClass}/${characterVariant}/${characterVariant}_1.png`}
        width={40}
      />
    </div>
  );
};

export default MemberCard;
