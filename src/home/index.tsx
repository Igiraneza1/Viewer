// pages/index.tsx
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Recipe } from '../types/recipe';
import recipes from '../data/recipes.json';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      recipes,
    },
  };
};

export default function Home({ recipes }: { recipes: Recipe[] }) {
  return (
    <div>
      <h1>Recipe Viewer</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link href={`/recipes/${recipe.slug}`}>
              <a>
                <h2>{recipe.title}</h2>
                <Image src={`/images/${recipe.image}`} alt={recipe.title} width={300} height={200} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
