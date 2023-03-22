import { v4 as uuidv4 } from 'uuid';
import { LoremIpsum } from 'lorem-ipsum';

import { PostsEntity } from 'src/posts/entity/PostsEntity';

const INITIAL_POSTS_COUNT = 5;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const generatePosts = () => {
  const initialPosts = [];
  for (let i = 0; i < INITIAL_POSTS_COUNT; i++) {
    initialPosts.push({
      id: uuidv4(),
      title: lorem.generateWords(2),
      subTitle: lorem.generateWords(7),
      description: lorem.generateSentences(45),
    });
  }
  return initialPosts;
};

export const posts: PostsEntity[] = generatePosts();
