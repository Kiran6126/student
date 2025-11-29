const DEFAULT_STUDENTS = [
  { id: "1234500001", name: "Aarav Sharma", email: "aarav.sharma@university.edu", password: "Student@001" },
  { id: "1234500002", name: "Aanya Patel", email: "aanya.patel@university.edu", password: "Student@002" },
  { id: "1234500003", name: "Vivaan Reddy", email: "vivaan.reddy@university.edu", password: "Student@003" },
  { id: "1234500004", name: "Diya Iyer", email: "diya.iyer@university.edu", password: "Student@004" },
  { id: "1234500005", name: "Aditya Verma", email: "aditya.verma@university.edu", password: "Student@005" },
  { id: "1234500006", name: "Kiara Das", email: "kiara.das@university.edu", password: "Student@006" },
  { id: "1234500007", name: "Aryan Nair", email: "aryan.nair@university.edu", password: "Student@007" },
  { id: "1234500008", name: "Ishita Ghosh", email: "ishita.ghosh@university.edu", password: "Student@008" },
  { id: "1234500009", name: "Arjun Joshi", email: "arjun.joshi@university.edu", password: "Student@009" },
  { id: "1234500010", name: "Kavya Mehta", email: "kavya.mehta@university.edu", password: "Student@010" },
  { id: "1234500011", name: "Rohan Mishra", email: "rohan.mishra@university.edu", password: "Student@011" },
  { id: "1234500012", name: "Sneha Rao", email: "sneha.rao@university.edu", password: "Student@012" },
  { id: "1234500013", name: "Atharv Gupta", email: "atharv.gupta@university.edu", password: "Student@013" },
  { id: "1234500014", name: "Myra Singh", email: "myra.singh@university.edu", password: "Student@014" },
  { id: "1234500015", name: "Krish Bhat", email: "krish.bhat@university.edu", password: "Student@015" },
  { id: "1234500016", name: "Ananya Dey", email: "ananya.dey@university.edu", password: "Student@016" },
  { id: "1234500017", name: "Hriday Roy", email: "hriday.roy@university.edu", password: "Student@017" },
  { id: "1234500018", name: "Tejas Yadav", email: "tejas.yadav@university.edu", password: "Student@018" },
  { id: "1234500019", name: "Ayushi Paul", email: "ayushi.paul@university.edu", password: "Student@019" },
  { id: "1234500020", name: "Reyansh Kumar", email: "reyansh.kumar@university.edu", password: "Student@020" },
  { id: "1234500021", name: "Tanishq Pillai", email: "tanishq.pillai@university.edu", password: "Student@021" },
  { id: "1234500022", name: "Aarohi Jain", email: "aarohi.jain@university.edu", password: "Student@022" },
  { id: "1234500023", name: "Ayaan Shetty", email: "ayaan.shetty@university.edu", password: "Student@023" },
  { id: "1234500024", name: "Nisha Menon", email: "nisha.menon@university.edu", password: "Student@024" },
  { id: "1234500025", name: "Harsh Vora", email: "harsh.vora@university.edu", password: "Student@025" },
  { id: "1234500026", name: "Jiya Abraham", email: "jiya.abraham@university.edu", password: "Student@026" },
  { id: "1234500027", name: "Rudra Nanda", email: "rudra.nanda@university.edu", password: "Student@027" },
  { id: "1234500028", name: "Mahi Fernandes", email: "mahi.fernandes@university.edu", password: "Student@028" },
  { id: "1234500029", name: "Shaurya Kapoor", email: "shaurya.kapoor@university.edu", password: "Student@029" },
  { id: "1234500030", name: "Tanvi Lobo", email: "tanvi.lobo@university.edu", password: "Student@030" },
  { id: "1234500031", name: "Dev Tiwari", email: "dev.tiwari@university.edu", password: "Student@031" },
  { id: "1234500032", name: "Harini Krishnan", email: "harini.krishnan@university.edu", password: "Student@032" },
  { id: "1234500033", name: "Ayush Rajan", email: "ayush.rajan@university.edu", password: "Student@033" },
  { id: "1234500034", name: "Sanvi Deshmukh", email: "sanvi.deshmukh@university.edu", password: "Student@034" },
  { id: "1234500035", name: "Laksh Sinha", email: "laksh.sinha@university.edu", password: "Student@035" },
  { id: "1234500036", name: "Meera Saluja", email: "meera.saluja@university.edu", password: "Student@036" },
  { id: "1234500037", name: "Parth Raut", email: "parth.raut@university.edu", password: "Student@037" },
  { id: "1234500038", name: "Ishan Patil", email: "ishan.patil@university.edu", password: "Student@038" },
  { id: "1234500039", name: "Diya Thomas", email: "diya.thomas@university.edu", password: "Student@039" },
  { id: "1234500040", name: "Arnav Bhattacharya", email: "arnav.bhattacharya@university.edu", password: "Student@040" },
  { id: "1234500041", name: "Aishwarya Sen", email: "aishwarya.sen@university.edu", password: "Student@041" },
  { id: "1234500042", name: "Manan Chatterjee", email: "manan.chatterjee@university.edu", password: "Student@042" },
  { id: "1234500043", name: "Ishaan Bhaskar", email: "ishaan.bhaskar@university.edu", password: "Student@043" },
  { id: "1234500044", name: "Riya Prakash", email: "riya.prakash@university.edu", password: "Student@044" },
  { id: "1234500045", name: "Aniket Borkar", email: "aniket.borkar@university.edu", password: "Student@045" },
  { id: "1234500046", name: "Shruti Nambiar", email: "shruti.nambiar@university.edu", password: "Student@046" },
  { id: "1234500047", name: "Vihaan Dasgupta", email: "vihaan.dasgupta@university.edu", password: "Student@047" },
  { id: "1234500048", name: "Anushka Naidu", email: "anushka.naidu@university.edu", password: "Student@048" },
  { id: "1234500049", name: "Karan Pillai", email: "karan.pillai@university.edu", password: "Student@049" },
  { id: "1234500050", name: "Nivedita Rao", email: "nivedita.rao@university.edu", password: "Student@050" },
  { id: "1234500051", name: "Tanuj Aggarwal", email: "tanuj.aggarwal@university.edu", password: "Student@051" },
  { id: "1234500052", name: "Charvi Reddy", email: "charvi.reddy@university.edu", password: "Student@052" },
  { id: "1234500053", name: "Om Khanna", email: "om.khanna@university.edu", password: "Student@053" },
  { id: "1234500054", name: "Neha Bhatt", email: "neha.bhatt@university.edu", password: "Student@054" },
  { id: "1234500055", name: "Aradhya Sethi", email: "aradhya.sethi@university.edu", password: "Student@055" },
  { id: "1234500056", name: "Daksh Chawla", email: "daksh.chawla@university.edu", password: "Student@056" },
  { id: "1234500057", name: "Prisha Gautam", email: "prisha.gautam@university.edu", password: "Student@057" },
  { id: "1234500058", name: "Adarsh Malhotra", email: "adarsh.malhotra@university.edu", password: "Student@058" },
  { id: "1234500059", name: "Avantika Paul", email: "avantika.paul@university.edu", password: "Student@059" },
  { id: "1234500060", name: "Rudraksh Kaur", email: "rudraksh.kaur@university.edu", password: "Student@060" },
  { id: "1234500061", name: "Aarohi Gurnani", email: "aarohi.gurnani@university.edu", password: "Student@061" },
  { id: "1234500062", name: "Rahul Chacko", email: "rahul.chacko@university.edu", password: "Student@062" },
  { id: "1234500063", name: "Esha Dutt", email: "esha.dutt@university.edu", password: "Student@063" },
  { id: "1234500064", name: "Anmol Tagore", email: "anmol.tagore@university.edu", password: "Student@064" },
  { id: "1234500065", name: "Kriti Shukla", email: "kriti.shukla@university.edu", password: "Student@065" },
  { id: "1234500066", name: "Aarav Mahajan", email: "aarav.mahajan@university.edu", password: "Student@066" },
  { id: "1234500067", name: "Devika Joshi", email: "devika.joshi@university.edu", password: "Student@067" },
  { id: "1234500068", name: "Hridaan Singhania", email: "hridaan.singhania@university.edu", password: "Student@068" },
  { id: "1234500069", name: "Saanvi Sharma", email: "saanvi.sharma@university.edu", password: "Student@069" },
  { id: "1234500070", name: "Neil Venkatesh", email: "neil.venkatesh@university.edu", password: "Student@070" },
  { id: "1234500071", name: "Aadhya Jadhav", email: "aadhya.jadhav@university.edu", password: "Student@071" },
  { id: "1234500072", name: "Ritvik Bose", email: "ritvik.bose@university.edu", password: "Student@072" },
  { id: "1234500073", name: "Manvi Chopra", email: "manvi.chopra@university.edu", password: "Student@073" },
  { id: "1234500074", name: "Anay Thomas", email: "anay.thomas@university.edu", password: "Student@074" },
  { id: "1234500075", name: "Dia Arora", email: "dia.arora@university.edu", password: "Student@075" },
  { id: "1234500076", name: "Ritesh Fernandes", email: "ritesh.fernandes@university.edu", password: "Student@076" },
  { id: "1234500077", name: "Namita Menon", email: "namita.menon@university.edu", password: "Student@077" },
  { id: "1234500078", name: "Vivaan Nair", email: "vivaan.nair@university.edu", password: "Student@078" },
  { id: "1234500079", name: "Aaradhya Bansal", email: "aaradhya.bansal@university.edu", password: "Student@079" },
  { id: "1234500080", name: "Aaryan Raj", email: "aaryan.raj@university.edu", password: "Student@080" },
  { id: "1234500081", name: "Snehal Ghosh", email: "snehal.ghosh@university.edu", password: "Student@081" },
  { id: "1234500082", name: "Shaivi Iyer", email: "shaivi.iyer@university.edu", password: "Student@082" },
  { id: "1234500083", name: "Tanish Agrawal", email: "tanish.agrawal@university.edu", password: "Student@083" },
  { id: "1234500084", name: "Aarav Mathew", email: "aarav.mathew@university.edu", password: "Student@084" },
  { id: "1234500085", name: "Lavanya Nanda", email: "lavanya.nanda@university.edu", password: "Student@085" },
  { id: "1234500086", name: "Vansh Rastogi", email: "vansh.rastogi@university.edu", password: "Student@086" },
  { id: "1234500087", name: "Kiara Dutta", email: "kiara.dutta@university.edu", password: "Student@087" },
  { id: "1234500088", name: "Aarush Kapoor", email: "aarush.kapoor@university.edu", password: "Student@088" },
  { id: "1234500089", name: "Diya Menon", email: "diya.menon@university.edu", password: "Student@089" },
  { id: "1234500090", name: "Pranav Rishi", email: "pranav.rishi@university.edu", password: "Student@090" },
  { id: "1234500091", name: "Shreya Kurup", email: "shreya.kurup@university.edu", password: "Student@091" },
  { id: "1234500092", name: "Ajay Bhattacharjee", email: "ajay.bhattacharjee@university.edu", password: "Student@092" },
  { id: "1234500093", name: "Anjali Rao", email: "anjali.rao@university.edu", password: "Student@093" },
  { id: "1234500094", name: "Kavin Nair", email: "kavin.nair@university.edu", password: "Student@094" },
  { id: "1234500095", name: "Ruhi De", email: "ruhi.de@university.edu", password: "Student@095" },
  { id: "1234500096", name: "Aarav Vora", email: "aarav.vora@university.edu", password: "Student@096" },
  { id: "1234500097", name: "Jhanvi Singh", email: "jhanvi.singh@university.edu", password: "Student@097" },
  { id: "1234500098", name: "Samar Pandey", email: "samar.pandey@university.edu", password: "Student@098" },
  { id: "1234500099", name: "Yash Agarwal", email: "yash.agarwal@university.edu", password: "Student@099" },
  { id: "1234500100", name: "Ishani Das", email: "ishani.das@university.edu", password: "Student@100" },
  { id: "1234500101", name: "Manas Mehta", email: "manas.mehta@university.edu", password: "Student@101" },
  { id: "1234500102", name: "Tanmay Shetty", email: "tanmay.shetty@university.edu", password: "Student@102" },
  { id: "1234500103", name: "Kavya Choudhary", email: "kavya.choudhary@university.edu", password: "Student@103" },
  { id: "1234500104", name: "Aarohi Jain", email: "aarohi.jain2@university.edu", password: "Student@104" },
  { id: "1234500105", name: "Aditya Bhat", email: "aditya.bhat@university.edu", password: "Student@105" },
  { id: "1234500106", name: "Priya Soren", email: "priya.soren@university.edu", password: "Student@106" },
  { id: "1234500107", name: "Arun Reddy", email: "arun.reddy@university.edu", password: "Student@107" },
  { id: "1234500108", name: "Sneha Lobo", email: "sneha.lobo@university.edu", password: "Student@108" },
  { id: "1234500109", name: "Ayaan Roy", email: "ayaan.roy@university.edu", password: "Student@109" },
  { id: "1234500110", name: "Nitya Rao", email: "nitya.rao@university.edu", password: "Student@110" },
  { id: "1234500111", name: "Dhruv Patil", email: "dhruv.patil@university.edu", password: "Student@111" },
  { id: "1234500112", name: "Aanya Dey", email: "aanya.dey2@university.edu", password: "Student@112" },
  { id: "1234500113", name: "Harshit Singh", email: "harshit.singh@university.edu", password: "Student@113" },
  { id: "1234500114", name: "Isha Kurup", email: "isha.kurup@university.edu", password: "Student@114" },
  { id: "1234500115", name: "Ayush Pawar", email: "ayush.pawar@university.edu", password: "Student@115" },
  { id: "1234500116", name: "Aanya Chawla", email: "aanya.chawla@university.edu", password: "Student@116" },
  { id: "1234500117", name: "Krish Mehra", email: "krish.mehra@university.edu", password: "Student@117" },
  { id: "1234500118", name: "Tia Fernandes", email: "tia.fernandes@university.edu", password: "Student@118" },
  { id: "1234500119", name: "Kavin Dasgupta", email: "kavin.dasgupta@university.edu", password: "Student@119" },
  { id: "1234500120", name: "Ruhaan Sinha", email: "ruhaan.sinha@university.edu", password: "Student@120" },
  { id: "1234500121", name: "Arnav D'Souza", email: "arnav.dsouza@university.edu", password: "Student@121" },
  { id: "1234500122", name: "Kritika Banerjee", email: "kritika.banerjee@university.edu", password: "Student@122" },
  { id: "1234500123", name: "Devansh Iyer", email: "devansh.iyer@university.edu", password: "Student@123" },
  { id: "1234500124", name: "Aditi Verma", email: "aditi.verma@university.edu", password: "Student@124" },
  { id: "1234500125", name: "Aryan Chauhan", email: "aryan.chauhan@university.edu", password: "Student@125" },
  { id: "1234500126", name: "Shreya Mehta", email: "shreya.mehta@university.edu", password: "Student@126" },
  { id: "1234500127", name: "Aarush Ghosh", email: "aarush.ghosh@university.edu", password: "Student@127" },
  { id: "1234500128", name: "Riya Nair", email: "riya.nair@university.edu", password: "Student@128" },
  { id: "1234500129", name: "Arnav Vora", email: "arnav.vora@university.edu", password: "Student@129" },
  { id: "1234500130", name: "Sneha Patel", email: "sneha.patel@university.edu", password: "Student@130" },
  { id: "1234500131", name: "Soham Reddy", email: "soham.reddy@university.edu", password: "Student@131" },
  { id: "1234500132", name: "Avni Pillai", email: "avni.pillai@university.edu", password: "Student@132" },
  { id: "1234500133", name: "Ansh Gupta", email: "ansh.gupta@university.edu", password: "Student@133" },
  { id: "1234500134", name: "Manya Sharma", email: "manya.sharma@university.edu", password: "Student@134" },
  { id: "1234500135", name: "Harsh Soni", email: "harsh.soni@university.edu", password: "Student@135" },
  { id: "1234500136", name: "Isha Krishnan", email: "isha.krishnan@university.edu", password: "Student@136" },
  { id: "1234500137", name: "Ritesh Jain", email: "ritesh.jain@university.edu", password: "Student@137" },
  { id: "1234500138", name: "Aarohi Sinha", email: "aarohi.sinha@university.edu", password: "Student@138" },
  { id: "1234500139", name: "Arnav Mehta", email: "arnav.mehta@university.edu", password: "Student@139" },
  { id: "1234500140", name: "Aadhya Pillai", email: "aadhya.pillai@university.edu", password: "Student@140" },
  { id: "1234500141", name: "Tanay Desai", email: "tanay.desai@university.edu", password: "Student@141" },
  { id: "1234500142", name: "Jiya Kurup", email: "jiya.kurup@university.edu", password: "Student@142" },
  { id: "1234500143", name: "Rohan Nair", email: "rohan.nair@university.edu", password: "Student@143" },
  { id: "1234500144", name: "Isha Gupta", email: "isha.gupta@university.edu", password: "Student@144" },
  { id: "1234500145", name: "Aaryan Joshi", email: "aaryan.joshi@university.edu", password: "Student@145" },
  { id: "1234500146", name: "Divya Yadav", email: "divya.yadav@university.edu", password: "Student@146" },
  { id: "1234500147", name: "Arya Bhat", email: "arya.bhat@university.edu", password: "Student@147" },
  { id: "1234500148", name: "Mohit Raj", email: "mohit.raj@university.edu", password: "Student@148" },
  { id: "1234500149", name: "Meera Pandey", email: "meera.pandey@university.edu", password: "Student@149" },
  { id: "1234500150", name: "Nikhil Sethi", email: "nikhil.sethi@university.edu", password: "Student@150" },
  { id: "1234500151", name: "Sahil Abraham", email: "sahil.abraham@university.edu", password: "Student@151" },
  { id: "1234500152", name: "Pooja Unni", email: "pooja.unni@university.edu", password: "Student@152" },
  { id: "1234500153", name: "Hridaan Majumdar", email: "hridaan.majumdar@university.edu", password: "Student@153" },
  { id: "1234500154", name: "Leena Ramaswamy", email: "leena.ramaswamy@university.edu", password: "Student@154" },
  { id: "1234500155", name: "Krish Vora", email: "krish.vora@university.edu", password: "Student@155" },
  { id: "1234500156", name: "Manisha Dey", email: "manisha.dey@university.edu", password: "Student@156" },
  { id: "1234500157", name: "Viraj Pillai", email: "viraj.pillai@university.edu", password: "Student@157" },
  { id: "1234500158", name: "Diya Kapoor", email: "diya.kapoor@university.edu", password: "Student@158" },
  { id: "1234500159", name: "Ayush Malhotra", email: "ayush.malhotra@university.edu", password: "Student@159" },
  { id: "1234500160", name: "Tania Dutta", email: "tania.dutta@university.edu", password: "Student@160" },
  { id: "1234500161", name: "Advaith Singh", email: "advaith.singh@university.edu", password: "Student@161" },
  { id: "1234500162", name: "Ishita Gaur", email: "ishita.gaur@university.edu", password: "Student@162" },
  { id: "1234500163", name: "Parth Patel", email: "parth.patel@university.edu", password: "Student@163" },
  { id: "1234500164", name: "Aaradhya Deshmukh", email: "aaradhya.deshmukh@university.edu", password: "Student@164" },
  { id: "1234500165", name: "Rishi Mehra", email: "rishi.mehra@university.edu", password: "Student@165" },
  { id: "1234500166", name: "Aanya Ghosh", email: "aanya.ghosh@university.edu", password: "Student@166" },
  { id: "1234500167", name: "Shlok Reddy", email: "shlok.reddy@university.edu", password: "Student@167" },
  { id: "1234500168", name: "Kritika Roy", email: "kritika.roy@university.edu", password: "Student@168" },
  { id: "1234500169", name: "Divyam Jadhav", email: "divyam.jadhav@university.edu", password: "Student@169" },
  { id: "1234500170", name: "Ananya Krishnan", email: "ananya.krishnan@university.edu", password: "Student@170" },
  { id: "1234500171", name: "Aarav Nair", email: "aarav.nair2@university.edu", password: "Student@171" },
  { id: "1234500172", name: "Ishaan Kumar", email: "ishaan.kumar@university.edu", password: "Student@172" },
  { id: "1234500173", name: "Mitali Ghosh", email: "mitali.ghosh@university.edu", password: "Student@173" },
  { id: "1234500174", name: "Vanshika Bansal", email: "vanshika.bansal@university.edu", password: "Student@174" },
  { id: "1234500175", name: "Arnav Lal", email: "arnav.lal@university.edu", password: "Student@175" },
  { id: "1234500176", name: "Aarohi Patel", email: "aarohi.patel@university.edu", password: "Student@176" },
  { id: "1234500177", name: "Priyansh Sharma", email: "priyansh.sharma@university.edu", password: "Student@177" },
  { id: "1234500178", name: "Mehak Vora", email: "mehak.vora@university.edu", password: "Student@178" },
  { id: "1234500179", name: "Shaurya Gupta", email: "shaurya.gupta@university.edu", password: "Student@179" },
  { id: "1234500180", name: "Disha Pillai", email: "disha.pillai@university.edu", password: "Student@180" },
  { id: "1234500181", name: "Rajveer Yadav", email: "rajveer.yadav@university.edu", password: "Student@181" },
  { id: "1234500182", name: "Shreya Reddy", email: "shreya.reddy@university.edu", password: "Student@182" },
  { id: "1234500183", name: "Aarav Joshi", email: "aarav.joshi@university.edu", password: "Student@183" },
  { id: "1234500184", name: "Kaira Paul", email: "kaira.paul@university.edu", password: "Student@184" },
  { id: "1234500185", name: "Aditya Dutta", email: "aditya.dutta@university.edu", password: "Student@185" },
  { id: "1234500186", name: "Sneha Krishnan", email: "sneha.krishnan@university.edu", password: "Student@186" },
  { id: "1234500187", name: "Hriday Jain", email: "hriday.jain@university.edu", password: "Student@187" },
  { id: "1234500188", name: "Avika Patel", email: "avika.patel@university.edu", password: "Student@188" },
  { id: "1234500189", name: "Advait Kapoor", email: "advait.kapoor@university.edu", password: "Student@189" },
  { id: "1234500190", name: "Tanvi Iyer", email: "tanvi.iyer@university.edu", password: "Student@190" },
  { id: "1234500191", name: "Aarush Bhardwaj", email: "aarush.bhardwaj@university.edu", password: "Student@191" },
  { id: "1234500192", name: "Kriti Menon", email: "kriti.menon@university.edu", password: "Student@192" },
  { id: "1234500193", name: "Yuvraj Dey", email: "yuvraj.dey@university.edu", password: "Student@193" },
  { id: "1234500194", name: "Diya Tiwari", email: "diya.tiwari@university.edu", password: "Student@194" },
  { id: "1234500195", name: "Aryan Shukla", email: "aryan.shukla@university.edu", password: "Student@195" },
  { id: "1234500196", name: "Riya Naidu", email: "riya.naidu@university.edu", password: "Student@196" },
  { id: "1234500197", name: "Aarav Raut", email: "aarav.raut@university.edu", password: "Student@197" },
  { id: "1234500198", name: "Anaya Sen", email: "anaya.sen@university.edu", password: "Student@198" },
  { id: "1234500199", name: "Vihaan Pillai", email: "vihaan.pillai@university.edu", password: "Student@199" },
  { id: "1234500200", name: "Ishita Kumar", email: "ishita.kumar@university.edu", password: "Student@200" }
];

// Load from localStorage if available, otherwise use default list
let students = (() => {
  try {
    const raw = localStorage.getItem("students");
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore parse/storage errors
  }
  return DEFAULT_STUDENTS.slice();
})();

export { students };

let _studentsSaveTimer = null;
export function saveStudents(updatedStudents) {
  students = Array.isArray(updatedStudents) ? updatedStudents : [];

  // Debounce actual localStorage write to avoid blocking UI on frequent updates
  try {
    if (_studentsSaveTimer) clearTimeout(_studentsSaveTimer);
    _studentsSaveTimer = setTimeout(() => {
      try {
        localStorage.setItem("students", JSON.stringify(students));
        try { localStorage.setItem("students_last_saved", new Date().toISOString()); } catch (e) {}
        try { console.debug('[students] debounced save completed: count=', students.length); } catch (e) {}
      } catch (e) {
        // ignore storage errors
      }
      _studentsSaveTimer = null;
    }, 150);
  } catch (e) {
    // ignore
  }
}

// Force-write students to localStorage immediately (useful when the caller
// needs persistence to be available right away, e.g. before a reload/login)
export function flushStudents() {
  try {
    if (_studentsSaveTimer) {
      clearTimeout(_studentsSaveTimer);
      _studentsSaveTimer = null;
    }
    localStorage.setItem("students", JSON.stringify(students));
    try { localStorage.setItem("students_last_saved", new Date().toISOString()); } catch (e) {}
    try { console.debug('[students] flushStudents wrote to localStorage: count=', students.length); } catch (e) {}
  } catch (e) {
    // ignore storage errors
  }
}

export function resetStudents() {
  try {
    students = DEFAULT_STUDENTS.slice();
    localStorage.removeItem("students");
  } catch (e) {
    // ignore
  }
}
