import type { Story } from './types';

/**
 * Seed oral histories. Written to feel real and respectful — plausible names,
 * service details, and testimony that is moving without being exploitative.
 *
 * Story id "1" is the reserved featured slot; the client's real interview will
 * replace it later. Photos use the initial-letter fallback (photo_url: null)
 * until real portraits are supplied. Media types cover written / audio / video /
 * mixed so every player appears in the demo.
 */
export const SEED_STORIES: Story[] = [
  {
    id: '1',
    title: 'Signals in the Dark',
    veteran_name: 'James Halloran',
    rank: 'Radioman Second Class',
    branch: 'Navy',
    conflict: 'World War II',
    theater: 'Pacific Theater',
    years_of_service: '1942–1945',
    media_type: 'mixed',
    photo_url: null,
    audio_url: require('@/assets/audio/halloran.m4a'),
    video_url: null,
    featured: true,
    status: 'approved',
    recorded_label: 'Recorded 2019',
    summary:
      'A radioman aboard a heavy cruiser in the Pacific, Jim Halloran spent the war translating the sea into signals — and learned to carry the silences between them.',
    story_content:
      'I was nineteen when I enlisted. My brother had already gone, and my mother didn’t want two of us out there. But I remember standing in the kitchen in Scranton, and I just knew. I went down to the recruiting office the next morning before she was up.\n\nAboard the Chester I was a radioman. I had the headphones on for hours at a stretch. You learn the rhythm of it, the dots and dashes, until it’s almost like a voice. On the bad nights it was the only thing telling you where the rest of the fleet was. You held onto that.\n\nWe took a torpedo off the Solomons in ’42. I was below, and the lights went, and for a few seconds there was just the sound of the ship — this great groan of steel. We lost men that night. Good men. I still say their names on the anniversary. That’s the part you carry. Not the medals. The names.\n\nIf you remember anything, remember that we were just kids, mostly. Farm boys and city boys who’d never seen the ocean. We did our jobs because the fella next to you was doing his. We looked out for each other. That was the whole of it.',
  },
  {
    id: '2',
    title: 'The Long Road Out of Chosin',
    veteran_name: 'Raymond Delgado',
    rank: 'Corporal',
    branch: 'Marine Corps',
    conflict: 'Korean War',
    theater: 'Chosin Reservoir',
    years_of_service: '1950–1951',
    media_type: 'audio',
    photo_url: null,
    audio_url: require('@/assets/audio/delgado.m4a'),
    video_url: null,
    featured: false,
    status: 'approved',
    recorded_label: 'Recorded 2014',
    summary:
      'A Marine at the Chosin Reservoir, Corporal Ray Delgado marched out of the mountains in the coldest winter of the war — and never forgot the men who marched beside him.',
    story_content:
      'People call it the Frozen Chosin. It was colder than they say. Thirty below some nights. Your canteen froze, the rations froze. You’d thaw a can under your arm just to eat. A boy from El Paso — I’d never seen snow that wasn’t on a mountain far away, and here I was in the middle of it.\n\nWe were surrounded, and the only way the division got out was together. We didn’t leave our wounded and we didn’t leave our dead if we could help it. The gunny used to say we were just attacking in a different direction. We told that joke to keep from freezing solid, I think.\n\nWhat got me through was the fella on my left and the fella on my right. You stop thinking about yourself out there. If I keep moving, he keeps moving. My mother had pinned a little medal to my jacket before I shipped. I still have it. I held it a lot on that road.\n\nWe call it the forgotten war. Don’t forget them. That’s all I ask. Don’t forget them.',
  },
  {
    id: '3',
    title: 'What the River Remembered',
    veteran_name: 'Thomas Nakamura',
    rank: 'Specialist Five',
    branch: 'Army',
    conflict: 'Vietnam War',
    theater: 'Mekong Delta',
    years_of_service: '1968–1969',
    media_type: 'written',
    photo_url: null,
    audio_url: null,
    video_url: null,
    featured: false,
    status: 'approved',
    recorded_label: 'Submitted 2021',
    summary:
      'A river patrol crewman in the Mekong Delta, Tom Nakamura came home to a quiet life and kept his war folded away for decades before he found the words.',
    story_content:
      'The Delta was all water and green. We ran the rivers in a small boat, and you learned to read the banks the way a sailor reads the sky. Before dawn we were already out, because in the afternoon somebody’s life might depend on whether you’d been careful that morning.\n\nWe carried men who didn’t make it and men who did and wrote me letters twenty years later. You never know which it’ll be. You just go.\n\nComing home was hard. Nobody said welcome home for a long time. I put the uniform in a box and I didn’t talk about it — not to my wife, not to my kids, for years. It took a long time to understand that staying quiet wasn’t the same as being at peace.\n\nI decided to write this down because my grandson asked. I realized the men I served with deserve to be more than a silence. Every one of them had a story, and most never got to tell it. This is a little of mine, and a little of theirs.',
  },
  {
    id: '4',
    title: 'The Weight of the Vest',
    veteran_name: 'Marcus Bell',
    rank: 'Sergeant',
    branch: 'Marine Corps',
    conflict: 'Iraq War',
    theater: 'Al Anbar Province',
    years_of_service: '2004–2006',
    media_type: 'audio',
    photo_url: null,
    audio_url: require('@/assets/audio/bell.m4a'),
    video_url: null,
    featured: false,
    status: 'approved',
    recorded_label: 'Recorded 2022',
    summary:
      'A squad leader in Al Anbar, Sergeant Marcus Bell learned that leadership was mostly about the letters you wrote and the people you brought home.',
    story_content:
      'Anbar in those years was long stretches of nothing and then everything at once. You carried sixty pounds of gear in a hundred and twenty degrees and you kept your people talking, kept them sharp, because the heat and the waiting will wear a man down as fast as anything else.\n\nI made sergeant young. What that meant was you didn’t sleep. You learned everybody’s hometown, their kid’s name, their girl’s name, because that’s what kept them human out there. That was my job as much as anything with a rifle.\n\nWe lost one of ours on a road outside Ramadi. I wrote that letter home a dozen times before I could send it. You don’t get over a thing like that. You just learn to carry it and keep your other people alive.\n\nWhen folks thank me for my service, I think about the ones who can’t be thanked. This is for them. I’m only still here to talk because they did their jobs, and I try to live like I owe them something. Because I do.',
  },
  {
    id: '5',
    title: 'Dust and Distance',
    veteran_name: 'Elena Vasquez',
    rank: 'Staff Sergeant',
    branch: 'Army',
    conflict: 'Afghanistan War',
    theater: 'Helmand Province',
    years_of_service: '2010–2011',
    media_type: 'video',
    photo_url: null,
    audio_url: null,
    video_url: require('@/assets/video/vasquez.mp4'),
    featured: false,
    status: 'approved',
    recorded_label: 'Recorded 2023',
    summary:
      'A medic in Helmand Province, Staff Sergeant Elena Vasquez spent her tour keeping others alive — and came home to learn how to let herself be cared for, too.',
    story_content:
      'I was a medic. Helmand was dust and distance — you could see weather coming for an hour before it reached you. My whole world narrowed to the people in front of me who needed help, and whether I had what they needed in my bag.\n\nThe thing nobody tells you is how much of it is waiting, and how you carry every face. I remember all of them. The ones I could help and the ones I couldn’t. You don’t choose which ones stay with you.\n\nComing back, I didn’t know how to stop being the one who takes care of everybody. It took me a couple of years and some good people to learn that letting someone care for you isn’t weakness. It’s how you keep going.\n\nI’m telling this because women have been serving in these wars the whole time, and our stories belong in the record too. Not louder than anyone’s. Just there, alongside them, where they’ve always been.',
  },
];
