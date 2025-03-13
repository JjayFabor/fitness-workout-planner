import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";


const Home = () => {

  const handleSubmit = () => {
    router.get('/workout-plans');
  };

  return (
    <div className="bg-gray-200 h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800">Hello, World!</h1>

      <div className="w-full max-w-md mt-6 flex justify-center">
        <Button variant="outline" onClick={handleSubmit}>Button</Button>
      </div>
    </div>
  );
}



export default Home;