import type { NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { Text } from "@nextui-org/react";
import ArticleCard from "@/components/ArticleCard";

const MainFeed: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [articles, setArticles] = useState<string[]>([]);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("articles")
        .select("*")
        .limit(10);
      console.log(data);
      if (data != null) {
        setArticles(data);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <>
      <Text h2>Main Feed</Text>
      <Text size="$lg" css={{ my: "$8" }}>
        Check out articles from users here
      </Text>
      {articles.map((article) => (
        <ArticleCard article={article} />
      ))}
    </>
  );
};

export default MainFeed;
