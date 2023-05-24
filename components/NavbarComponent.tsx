import { Navbar, Button, Text } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarComnponent = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  function signOutUser() {
    supabaseClient.auth.signOut();
    router.push("/"); //localhost:3000
  }

  return (
    <Navbar>
      <Navbar.Brand as={Link} href="/">
        ShareArticles
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="highlight-rounded">
        <Navbar.Link href="/mainFeed">Main Feed</Navbar.Link>
        <Navbar.Link href="/mainArticle">Create Article</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {!user /*User doesnt exist*/ ? (
          <>
            <Navbar.Link href="/login">
              <Button auto flat>
                Login
              </Button>
            </Navbar.Link>
          </>
        ) : (
          /* USer does exist */
          <>
            <Navbar.Item>
              <Text>Hey , {user?.email}</Text>
            </Navbar.Item>
            <Navbar.Item>
              <Button auto flat onPress={() => signOutUser()}>
                Sign out
              </Button>
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarComnponent;
