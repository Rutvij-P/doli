import { motion } from "framer-motion";
import Herocar from "./Herocar";
import { animationStart, reveal } from "./utils/animation";

function HeroText() {
    return (
        <motion.div
            layout
            initial={{ height: 0 }}
            animate={{ height: "unset" }}
            transition={{ delay: animationStart, duration: 1 }}
            className="flex flex-col items-center text-center"
        >
            
            <motion.div 
                variants={reveal} 
                initial="hiddenVariant" 
                animate="revealedVariant" 
                transition={{ delay: animationStart + 1, duration: 0.5 }} 
                className="flex text-3vw <md:text-24px font-bold pt-100px"
            >
                <span className="flex center items-center gap-10px"> Unlock your <Herocar /> Ideal Car:</span>
            </motion.div>
            <motion.div 
                variants={reveal} 
                initial="hiddenVariant" 
                animate="revealedVariant" 
                transition={{ delay: animationStart + 1, duration: 0.5 }} 
                className="flex text-3vw <md:text-24px font-bold mb-30px"
            >
                <span>Empowering Recommendations for your Needs.</span>
            </motion.div>
            <motion.span
                variants={reveal}
                initial="hiddenVariant"
                animate="revealedVariant"
                transition={{ delay: animationStart + 1.2, duration: 0.5 }} 
                className="mb-30px w-1/4 <lg:w-1/3 <md:w-1/2 text-16px leading-tight"
            >
                Welcome to our cutting-edge car recommendation platform, where finding your perfect ride has never been easier. 
                Our powerful algorithm analyzes your preferences and needs, providing you with personalized recommendations that match your unique requirements. 
            </motion.span>
        </motion.div>
    );
}

export default HeroText;