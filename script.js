(function(){
  "use strict";

  /* ================== CONFIG — à personnaliser ================== */
  // Numéro WhatsApp au format international, sans "+" ni espaces (ex : 212612345678)
  var WHATSAPP_NUMBER = "212690461515";
  /* ============================================================== */

  var d=document, b=d.body, burger=d.querySelector(".burger"), nav=d.getElementById("nav");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var currentLanguage="fr";
  b.classList.add("js");

  /* ---------- Langue ---------- */
  (function(){
    var buttons=d.querySelectorAll(".language-switch [data-language]");
    if(!buttons.length)return;

    var translations={
      "Agence digitale":["Digital agency","وكالة رقمية"],
      "au Maroc":["in Morocco","في المغرب"],
      "Sites web, identité de marque et marketing digital":["Websites, brand identity and digital marketing","مواقع إلكترونية وهوية العلامة التجارية والتسويق الرقمي"],
      "pour les PME et les marques.":["for businesses and brands.","للشركات والعلامات التجارية."],
      "Parler de votre projet":["Discuss your project","تحدث معنا عن مشروعك"],
      "Voir les réalisations":["View our work","اكتشف أعمالنا"],
      "Accueil":["Home","الرئيسية"],
      "Principal":["Main navigation","التنقل الرئيسي"],
      "À propos":["About","من نحن"],
      "Réalisations":["Our work","أعمالنا"],
      "Études de cas":["Case studies","دراسات الحالة"],
      "Services":["Services","الخدمات"],
      "Process":["Process","مراحل العمل"],
      "Contact":["Contact","اتصل بنا"],
      "Pour les entreprises":["For businesses","للشركات"],
      "À distance et sur rendez-vous":["Remote and by appointment","عن بُعد وبموعد مسبق"],
      "Nous réunissons stratégie, conception et développement pour aider votre entreprise à clarifier sa présence digitale et à faire de son site un outil utile à son activité.":["We bring strategy, design and development together to strengthen your digital presence and make your website a useful business tool.","نجمع بين الاستراتيجية والتصميم والتطوير لتعزيز حضور شركتك الرقمي وتحويل موقعها إلى أداة فعّالة لأعمالها."],
      "Découvrir notre approche":["Discover our approach","اكتشف منهجيتنا"],
      "Nos réalisations":["Selected work","أعمالنا"],
      "Des projets sélectionnés avec soin":["Projects carefully selected","مشاريع مختارة بعناية"],
      "Études de cas · UX, conception & développement":["Case studies · UX, design & development","دراسات الحالة · تجربة المستخدم والتصميم والتطوير"],
      "Des expériences pensées pour le terrain":["Digital experiences built for real needs","تجارب رقمية مصممة لاحتياجات واقعية"],
      "Deux projets, deux besoins métier : simplifier la prise de rendez-vous et rendre les commandes plus fluides.":["Two projects, two business needs: simplify appointment booking and streamline orders.","مشروعان واحتياجان مختلفان: تسهيل حجز المواعيد وتحسين تجربة الطلب."],
      "Nos services":["Our services","خدماتنا"],
      "Notre expertise à votre service":["Expertise at your service","خبرتنا في خدمتكم"],
      "Création de site internet":["Website creation","إنشاء المواقع الإلكترونية"],
      "Stratégie / UX / Performance":["Strategy / UX / Performance","الاستراتيجية / تجربة المستخدم / الأداء"],
      "Marketing digital":["Digital marketing","التسويق الرقمي"],
      "SEO / Stratégie":["SEO / Strategy","تحسين محركات البحث / الاستراتيجية"],
      "Brand design":["Brand design","تصميم الهوية"],
      "Identité visuelle / Direction artistique":["Visual identity / Art direction","الهوية البصرية / التوجيه الفني"],
      "Développement":["Development","التطوير"],
      "Intégration / Support technique":["Implementation / Technical support","التنفيذ / الدعم التقني"],
      "Stratégie, conception & savoir-faire":["Strategy, design & expertise","الاستراتيجية والتصميم والخبرة"],
      "Compétences & Méthodologie":["Skills & methodology","المهارات والمنهجية"],
      "Un projet réussi commence bien avant la première ligne de code. Chaque étape est pensée pour répondre à vos objectifs et aux besoins de vos utilisateurs.":["A successful project starts long before the first line of code. Every step is designed around your goals and your users’ needs.","يبدأ المشروع الناجح قبل كتابة أول سطر برمجي. صُممت كل مرحلة لتحقيق أهدافكم وتلبية احتياجات المستخدمين."],
      "Analyse &":["Analysis &","التحليل و"],
      "Compréhension":["Discovery","الفهم"],
      "Immersion dans vos objectifs et votre activité, étude de votre public cible et analyse du marché.":["Understanding your goals and business, researching your audience and analyzing the market.","فهم أهدافكم ونشاطكم، ودراسة جمهوركم المستهدف وتحليل السوق."],
      "Conception &":["Design &","التصميم و"],
      "Architecture":["Architecture","البنية"],
      "Parcours UX/UI, wireframes et structure technique adaptée au projet et à son évolution.":["UX/UI journeys, wireframes and a technical structure tailored to your project and its growth.","مسارات تجربة وواجهة المستخدم، ومخططات أولية وبنية تقنية تناسب المشروع وتطوره."],
      "Développement &":["Development &","التطوير و"],
      "Optimisation":["Optimization","التحسين"],
      "Code propre et responsive, optimisé pour le référencement, l’accessibilité et la vitesse.":["Clean, responsive code optimized for search, accessibility and speed.","برمجة نظيفة ومتجاوبة ومحسّنة لمحركات البحث وإمكانية الوصول والسرعة."],
      "Recette &":["Testing &","الاختبار و"],
      "Livraison":["Delivery","التسليم"],
      "Tests sur plusieurs supports, prise en compte de vos retours et accompagnement jusqu’au lancement.":["Testing across devices, incorporating your feedback and supporting you through launch.","اختبار على مختلف الأجهزة، ومراعاة ملاحظاتكم ومرافقتكم حتى الإطلاق."],
      "Technologies & environnement":["Technology & tools","التقنيات والأدوات"],
      "Ma boîte à outils":["My toolkit","مجموعة أدواتي"],
      "Les bons outils, choisis pour construire des expériences fiables et durables.":["The right tools for building reliable, lasting experiences.","أدوات مناسبة لبناء تجارب موثوقة ومستدامة."],
      "Travaillons":["Let’s work","لنعمل"],
      "ensemble":["together","معًا"],
      "Décrivez-nous votre projet, nous vous répondons rapidement.":["Tell us about your project and we’ll get back to you shortly.","أخبرنا عن مشروعك وسنرد عليك في أقرب وقت."],
      "Votre nom":["Your name","اسمك"],
      "Votre e-mail":["Your email","بريدك الإلكتروني"],
      "Votre téléphone":["Your phone","هاتفك"],
      "Votre message":["Your message","رسالتك"],
      "Envoyer sur WhatsApp":["Send via WhatsApp","أرسل عبر واتساب"],
      "Tous droits réservés":["All rights reserved","جميع الحقوق محفوظة"],
      "VOTRE MARQUE :":["YOUR BRAND:","علامتك التجارية:"],
      "AGENCE DIGITALE · PARLONS DE VOTRE PROJET":["DIGITAL AGENCY · LET’S TALK ABOUT YOUR PROJECT","وكالة رقمية · لنتحدث عن مشروعك"],
      "Activer le thème clair":["Enable light theme","تفعيل الوضع الفاتح"],
      "Activer le thème sombre":["Enable dark theme","تفعيل الوضع الداكن"],
      "Fermer le menu":["Close menu","إغلاق القائمة"],
      "Ouvrir le menu":["Open menu","فتح القائمة"],
      "Choisir la langue":["Choose language","اختر اللغة"]
      ,"Agence digitale | Votre marque":["Digital agency | Your brand","وكالة رقمية | علامتك التجارية"]
      ,"Sites web, identité de marque et marketing digital.":["Websites, brand identity and digital marketing.","المواقع الإلكترونية وهوية العلامة التجارية والتسويق الرقمي."]
      ,"Visiter le site ↗":["Visit website ↗","زيارة الموقع ↗"]
      ,"Site vitrine pour un club de fitness et de préparation physique à Tanger.":["A showcase website for a fitness and strength-training club in Tangier.","موقع تعريفي لنادٍ للياقة البدنية والتدريب البدني في طنجة."]
      ,"Site professionnel dédié à la présentation d’un cabinet médical et de ses services.":["A professional website presenting a medical practice and its services.","موقع احترافي للتعريف بعيادة طبية وخدماتها."]
      ,"Expérience web pour un établissement gastronomique, pensée pour mettre en valeur sa cuisine.":["A website experience designed to showcase a restaurant and its cuisine.","تجربة إلكترونية لمطعم، صُممت لإبراز أطباقه."]
      ,"Site dédié à la cuisine japonaise et à l’univers de Shinzō Sushi.":["A website celebrating Japanese cuisine and the world of Shinzō Sushi.","موقع مخصص للمطبخ الياباني وعالم Shinzō Sushi."]
      ,"Site vitrine d’une parapharmacie à Agadir, avec une sélection de marques internationales.":["A showcase website for a parapharmacy in Agadir, featuring international brands.","موقع تعريفي لمتجر للمستلزمات الصحية في أكادير، يضم مجموعة من العلامات التجارية العالمية."]
      ,"Site vitrine du cabinet dentaire du Dr Ouaim Khryyati, à Tanger.":["A showcase website for Dr. Ouaim Khryyati’s dental practice in Tangier.","موقع تعريفي لعيادة طب الأسنان للدكتور أوائم خرياتي في طنجة."]
      ,"Santé · Réservation":["Healthcare · Booking","الصحة · الحجز"]
      ,"Le cabinet reste accessible, même quand le médecin est aux urgences.":["The practice stays accessible, even when the doctor is on emergency duty.","تبقى العيادة متاحة حتى أثناء مناوبة الطبيب في قسم الطوارئ."]
      ,"Dr. Sami · Plateforme de prise de rendez-vous":["Dr. Sami · Appointment booking platform","د. سامي · منصة حجز المواعيد"]
      ,"Le défi":["The challenge","التحدي"]
      ,"Pris par ses gardes aux urgences, le Dr. Sami ne pouvait pas toujours répondre aux appels. Des patients n’arrivaient pas à le joindre et les rendez-vous étaient difficiles à suivre.":["While on emergency shifts, Dr. Sami could not always answer calls. Patients struggled to reach him and appointments were hard to track.","بسبب مناوباته في قسم الطوارئ، لم يكن الدكتور سامي قادرًا دائمًا على الرد على المكالمات. تعذّر على بعض المرضى التواصل معه وأصبحت متابعة المواعيد صعبة."]
      ,"La solution":["The solution","الحل"]
      ,"Une plateforme web autonome permet aux patients de réserver à toute heure. La disponibilité est gérée dynamiquement, avec synchronisation du calendrier et rappels automatiques.":["An independent online platform lets patients book at any time. Availability is managed dynamically, with calendar synchronization and automatic reminders.","تتيح منصة إلكترونية مستقلة للمرضى الحجز في أي وقت، مع إدارة ديناميكية للتوفر ومزامنة التقويم وإرسال التذكيرات تلقائيًا."]
      ,"Éléments de la solution":["Solution features","مميزات الحل"]
      ,"Réservation en ligne":["Online booking","الحجز عبر الإنترنت"]
      ,"Calendrier & rappels":["Calendar & reminders","التقويم والتذكيرات"]
      ,"Résultats du projet Dr. Sami":["Dr. Sami project results","نتائج مشروع د. سامي"]
      ,"d’appels manqués":["fewer missed calls","مكالمات فائتة أقل"]
      ,"réservation autonome":["self-service booking","حجز ذاتي"]
      ,"conflit d’agenda":["scheduling conflicts","تعارضات في المواعيد"]
      ,"Découvrir le site du Dr. Sami, ouvre un nouvel onglet":["Explore Dr. Sami’s website, opens in a new tab","اكتشف موقع د. سامي، يفتح في علامة تبويب جديدة"]
      ,"Aperçu du projet":["Project preview","معاينة المشروع"]
      ,"Ouvrir le site ↗":["Open website ↗","افتح الموقع ↗"]
      ,"Restauration · Commande":["Restaurant · Ordering","المطاعم · الطلبات"]
      ,"Aux heures de pointe, chaque commande trouve sa place.":["Every order finds its place, even at peak times.","لكل طلب مكانه حتى في أوقات الذروة."]
      ,"Shinzō Sushi Store · Parcours de commande":["Shinzō Sushi Store · Ordering experience","Shinzō Sushi Store · تجربة الطلب"]
      ,"Quand le restaurant était très fréquenté, les commandes par téléphone devenaient difficiles à organiser. Les erreurs et les retards de livraison nuisaient à l’expérience client.":["When the restaurant was busy, phone orders became difficult to manage. Errors and delivery delays affected the customer experience.","عندما كان المطعم مزدحمًا، أصبح تنظيم الطلبات الهاتفية صعبًا. وأثرت الأخطاء وتأخر التوصيل سلبًا على تجربة العملاء."]
      ,"Un menu interactif rapide permet de composer et personnaliser les rolls en temps réel. Chaque commande est structurée avant d’être transmise directement via WhatsApp ou le dashboard.":["A fast interactive menu lets customers build and customize rolls in real time. Each order is organized before being sent through WhatsApp or the dashboard.","تتيح قائمة تفاعلية سريعة إعداد وتخصيص أطباق السوشي مباشرةً. ويُنظّم كل طلب قبل إرساله عبر واتساب أو لوحة التحكم."]
      ,"Personnalisation en temps réel":["Real-time customization","تخصيص فوري"]
      ,"prise de commande plus rapide":["faster ordering","سرعة أكبر في الطلب"]
      ,"erreur de commande":["ordering errors","أخطاء في الطلبات"]
      ,"Fluide":["Seamless","سلس"]
      ,"de la sélection à l’envoi":["from selection to submission","من الاختيار إلى الإرسال"]
      ,"Votre nom":["Your name","اسمك"]
      ,"Votre e-mail":["Your email","بريدك الإلكتروني"]
      ,"Votre téléphone":["Your phone","هاتفك"]
      ,"Votre message":["Your message","رسالتك"]
      ,"Ex : Salim Saad":["e.g. Alex Smith","مثال: محمد العلوي"]
      ,"Ex : salim@email.com":["e.g. alex@email.com","مثال: user@email.com"]
      ,"Ex : 06 XX XX XX XX":["e.g. 06 XX XX XX XX","مثال: 06 XX XX XX XX"]
      ,"Bonjour, j'aimerais discuter de la création d'un site web…":["Hello, I’d like to discuss creating a website…","مرحبًا، أود مناقشة إنشاء موقع إلكتروني…"]
      ,"Notre processus | Muhcin.dev":["Our Process | Muhcin.dev","منهجية العمل | Muhcin.dev"]
      ,"Une méthode stratégique, étape par étape, pour créer des sites web performants qui transforment les visiteurs en clients.":["A strategic, step-by-step process for building high-performing websites that turn visitors into clients.","منهجية استراتيجية متكاملة لبناء مواقع عالية الأداء تحوّل الزوار إلى عملاء."]
      ,"Navigation principale":["Main navigation","التنقل الرئيسي"]
      ,"Stratégie. Design. Conversion.":["Strategy. Design. Conversion.","استراتيجية. تصميم. تحويل."]
      ,"Du concept à la conversion":["From concept to conversion","من الفكرة إلى التحويل"]
      ,"Un site web performant ne se crée pas en codant immédiatement. Il repose sur une stratégie claire, une structure centrée sur l'utilisateur et une feuille de route orientée conversion qui transforme l'attention en confiance, et la confiance en résultats commerciaux.":["A high-performing website is not created by jumping straight into code. It is built on a clear strategy, a user-centered structure, and a conversion-focused roadmap that turns attention into trust, and trust into business results.","لا يبدأ إنشاء موقع إلكتروني فعّال بكتابة الشيفرة مباشرةً، بل يستند إلى استراتيجية واضحة وبنية تتمحور حول المستخدم وخطة تركّز على التحويل، لتحويل الاهتمام إلى ثقة والثقة إلى نتائج تجارية."]
      ,"Lancer votre projet":["Start your project","ابدأ مشروعك"]
      ,"Voir nos réalisations":["View our work","اكتشف أعمالنا"]
      ,"Statistiques du processus de conception":["Process statistics","إحصائيات مراحل العمل"]
      ,"phases clés":["key phases","مراحل رئيسية"]
      ,"axé stratégie":["strategy-led","يرتكز على الاستراتيجية"]
      ,"Résultats":["Results","النتائج"]
      ,"conçus pour convertir":["designed to convert","مصممة لتحقيق التحويل"]
      ,"Comment nous concevons des sites web performants":["How we build high-performing websites","كيف نصمم مواقع إلكترونية عالية الأداء"]
      ,"Les grandes expériences numériques ne commencent pas par du code. Elles débutent par une vision claire de l'entreprise, la compréhension des utilisateurs et un plan structuré qui aligne le design, le message et la technologie sur vos véritables objectifs de croissance.":["Great digital experiences do not start with code. They begin with a clear vision for the business, an understanding of its users, and a structured plan that aligns design, messaging, and technology with your real growth goals.","لا تبدأ التجارب الرقمية المميزة بالشيفرة البرمجية، بل برؤية واضحة للشركة وفهم المستخدمين وخطة منظمة توائم التصميم والرسائل والتقنية مع أهداف النمو الحقيقية."]
      ,"Chronologie du processus de travail":["Our process timeline","مراحل سير العمل"]
      ,"Découverte & Stratégie":["Discovery & Strategy","الاستكشاف والاستراتيجية"]
      ,"Objectifs commerciaux, analyse de l'audience et clarté du marché.":["Business goals, audience research, and market clarity.","أهداف العمل ودراسة الجمهور وفهم السوق."]
      ,"Nous commençons par comprendre l'entreprise, l'audience cible, la voix de la marque et les objectifs pratiques derrière le projet. Cette phase s'assure que le site est conçu autour du bon message, du bon positionnement et des bons objectifs de conversion avant qu'une seule décision de design ne soit prise.":["We start by understanding the business, target audience, brand voice, and practical goals behind the project. This phase ensures the website is built around the right message, positioning, and conversion goals before any design decisions are made.","نبدأ بفهم الشركة والجمهور المستهدف وصوت العلامة التجارية والأهداف العملية للمشروع. وتضمن هذه المرحلة بناء الموقع حول الرسالة والتموضع وأهداف التحويل المناسبة قبل اتخاذ أي قرار تصميمي."]
      ,"Livrables clés":["Key deliverables","المخرجات الرئيسية"]
      ,"Analyse concurrentielle":["Competitor analysis","تحليل المنافسين"]
      ,"Revue des objectifs business":["Business goals review","مراجعة أهداف العمل"]
      ,"Analyse de l'audience cible":["Target audience analysis","تحليل الجمهور المستهدف"]
      ,"Feuille de route du projet et architecture du site":["Project roadmap and website architecture","خارطة طريق المشروع وبنية الموقع"]
      ,"Wireframing & Architecture UX":["Wireframing & UX architecture","التخطيط الهيكلي وبنية تجربة المستخدم"]
      ,"Parcours utilisateur, structure de conversion et mise en page.":["User journeys, conversion structure, and page layouts.","مسارات المستخدم وبنية التحويل وتخطيط الصفحات."]
      ,"Une fois la stratégie clarifiée, nous définissons le parcours utilisateur et la structure des pages. Nous cartographions la navigation, les points de conversion et les appels à l'action clés afin de rendre l'expérience intuitive et de susciter naturellement la prise de décision, plutôt que de reposer sur de la simple décoration.":["Once the strategy is clear, we define the user journey and page structure. We map navigation, conversion points, and key calls to action to make the experience intuitive and naturally guide decisions—instead of relying on decoration alone.","بعد توضيح الاستراتيجية، نحدد مسار المستخدم وبنية الصفحات. ونرسم التنقل ونقاط التحويل والدعوات الرئيسية لاتخاذ إجراء، لجعل التجربة سهلة وتوجيه القرار بشكل طبيعي بدل الاعتماد على الزخرفة فقط."]
      ,"Wireframes basse fidélité":["Low-fidelity wireframes","مخططات أولية منخفضة الدقة"]
      ,"Cartographie du parcours utilisateur":["User journey map","خريطة رحلة المستخدم"]
      ,"Structure essentielle des pages":["Core page structure","البنية الأساسية للصفحات"]
      ,"Plan de mise en page axé sur la conversion":["Conversion-focused layout plan","خطة تصميم تركز على التحويل"]
      ,"Design UI Haute Fidélité":["High-fidelity UI design","تصميم واجهة عالي الدقة"]
      ,"Identité visuelle, esthétique sombre/claire et maquettes interactives.":["Visual identity, light/dark aesthetics, and interactive prototypes.","هوية بصرية وتصميم للوضعين الفاتح والداكن ونماذج تفاعلية."]
      ,"Nous transformons la stratégie en une identité visuelle haut de gamme grâce à une typographie soignée, une hiérarchie claire, des animations fluides et des composants UI modernes. Le design est conçu pour inspirer confiance et clarté, tout en restant parfaitement adaptatif sur ordinateur, tablette et mobile.":["We turn strategy into a polished visual identity through considered typography, clear hierarchy, smooth animations, and modern UI components. The design builds trust and clarity while adapting seamlessly to desktop, tablet, and mobile.","نحوّل الاستراتيجية إلى هوية بصرية متقنة عبر خطوط مدروسة وتسلسل واضح وحركات سلسة وعناصر واجهة حديثة. ويهدف التصميم إلى بناء الثقة والوضوح مع التكيف الكامل مع الحاسوب واللوحي والهاتف."]
      ,"Maquettes UI haute fidélité":["High-fidelity UI mockups","نماذج واجهة عالية الدقة"]
      ,"Prototype interactif":["Interactive prototype","نموذج تفاعلي"]
      ,"Système visuel de marque":["Brand visual system","النظام البصري للعلامة التجارية"]
      ,"Adaptation du design en mode sombre/clair":["Dark/light theme adaptation","تكييف التصميم للوضعين الداكن والفاتح"]
      ,"Développement Propre & Optimisation":["Clean development & optimization","تطوير نظيف وتحسين"]
      ,"Code responsive, rapidité, référencement SEO et automatisation intelligente.":["Responsive code, speed, SEO, and smart automation.","برمجة متجاوبة وسرعة وتحسين لمحركات البحث وأتمتة ذكية."]
      ,"Une fois le design validé, nous le traduisons en un code propre, évolutif et ultra-rapide. Nous accordons la priorité aux affichages adaptatifs, au référencement naturel (SEO), à la vitesse, à la sécurité et à l'intégration d'outils pratiques comme la redirection des leads vers WhatsApp et les formulaires de réservation.":["Once the design is approved, we turn it into clean, scalable, high-speed code. We prioritize responsive layouts, SEO, speed, security, and practical tools such as sending leads to WhatsApp and booking forms.","بعد اعتماد التصميم، نحوله إلى شيفرة نظيفة وقابلة للتوسع وسريعة جدًا. نعطي الأولوية للتصميم المتجاوب وتحسين محركات البحث والسرعة والأمان ودمج الأدوات العملية، مثل تحويل العملاء المحتملين إلى واتساب ونماذج الحجز."]
      ,"Développement front-end propre":["Clean front-end development","تطوير واجهة أمامية نظيف"]
      ,"Compatibilité multi-navigateurs et mobile":["Cross-browser and mobile compatibility","التوافق مع مختلف المتصفحات والهواتف"]
      ,"Optimisation de la vitesse et des performances":["Speed and performance optimization","تحسين السرعة والأداء"]
      ,"Automatisation des formulaires et de WhatsApp":["Forms and WhatsApp automation","أتمتة النماذج وواتساب"]
      ,"Lancement & Optimisation de la Conversion":["Launch & conversion optimization","الإطلاق وتحسين التحويل"]
      ,"Assurance qualité, déploiement, outils d'analyse et transmission.":["Quality assurance, deployment, analytics, and handover.","ضمان الجودة والنشر والتحليلات والتسليم."]
      ,"Avant la mise en ligne, nous effectuons des tests de qualité approfondis, vérifions toutes les interactions, assurons la stabilité technique et préparons le site au déploiement. Après le lancement, nous configurons les outils d'analyse, validons le suivi des conversions et assurons une transmission claire pour que vous puissiez gérer le site en toute autonomie.":["Before launch, we run thorough quality tests, verify every interaction, ensure technical stability, and prepare the site for deployment. After launch, we configure analytics, validate conversion tracking, and provide a clear handover so you can manage the website independently.","قبل الإطلاق، نجري اختبارات جودة شاملة ونتحقق من جميع التفاعلات ونضمن الاستقرار التقني ونهيئ الموقع للنشر. وبعد الإطلاق، نضبط أدوات التحليل ونتحقق من تتبع التحويلات ونقدم شرحًا واضحًا لتتمكنوا من إدارة الموقع باستقلالية."]
      ,"Rapport de tests d'assurance qualité (QA)":["Quality assurance (QA) test report","تقرير اختبارات ضمان الجودة"]
      ,"Mise en ligne & déploiement":["Go-live & deployment","الإطلاق والنشر"]
      ,"Configuration du suivi analytique":["Analytics tracking setup","إعداد تتبع التحليلات"]
      ,"Guide de prise en main et formation client":["User guide and client training","دليل الاستخدام وتدريب العميل"]
      ,"Pourquoi ce processus fonctionne":["Why this process works","لماذا تنجح هذه المنهجية"]
      ,"Créer un site web sans méthode stratégique mène souvent à un positionnement flou, une expérience utilisateur confuse et un travail de design gâché. Un processus rigoureux aligne la stratégie, l'expérience utilisateur, l'image de marque et le code sur vos objectifs réels — ce qui garantit une meilleure crédibilité, un meilleur taux de conversion et des prospects plus qualifiés.":["Building a website without a strategic method often leads to unclear positioning, a confusing user experience, and wasted design work. A rigorous process aligns strategy, user experience, branding, and code with your real goals—resulting in greater credibility, higher conversion rates, and better-qualified leads.","غالبًا ما يؤدي إنشاء موقع دون منهجية استراتيجية إلى تموضع غير واضح وتجربة مستخدم مربكة وهدر في جهود التصميم. وتوائم المنهجية الدقيقة الاستراتيجية وتجربة المستخدم والعلامة التجارية والشيفرة مع أهدافكم الحقيقية، مما يعزز المصداقية ويرفع معدل التحويل ويحسن جودة العملاء المحتملين."]
      ,"Avantages de la méthode":["Benefits of this approach","مزايا هذه المنهجية"]
      ,"Positionnement clair":["Clear positioning","تموضع واضح"]
      ,"Expérience UX renforcée":["Improved UX","تجربة مستخدم محسّنة"]
      ,"Conversions élevées":["Higher conversions","تحويلات أعلى"]
      ,"Confiance accrue":["Greater trust","ثقة أكبر"]
      ,"Chaque décision prise répond à une seule question : cela aide-t-il votre entreprise à se développer ? C'est pourquoi notre méthode est pensée non seulement pour offrir un rendu élégant, mais aussi pour agir comme un véritable levier de croissance commercial.":["Every decision answers one question: does it help your business grow? That is why our process is designed not only to look polished, but also to serve as a genuine driver of business growth.","يجيب كل قرار عن سؤال واحد: هل يساعد شركتكم على النمو؟ لذلك صُممت منهجيتنا لتقدم مظهرًا أنيقًا، ولتكون أيضًا محركًا حقيقيًا لنمو الأعمال."]
      ,"Prêt à concevoir votre projet avec clarté ?":["Ready to shape your project with clarity?","هل أنتم مستعدون لتصميم مشروعكم بوضوح؟"]
      ,"Transformons votre futur site web en un moteur de croissance stratégique — un site au rendu haut de gamme, au message clair et qui génère des résultats mesurables.":["Let’s turn your future website into a strategic growth engine—with a polished look, a clear message, and measurable results.","لنجعل موقعكم القادم محركًا استراتيجيًا للنمو، بتصميم راقٍ ورسالة واضحة ونتائج قابلة للقياس."]
      ,"Réserver un appel":["Book a call","احجز مكالمة"]
      ,"Lancer un projet":["Start a project","ابدأ مشروعًا"]
      ,"Liens réseaux sociaux":["Social media links","روابط التواصل الاجتماعي"]
      ,"Stratégie digitale — Création de sites web — Design de marque — Stratégie digitale — Création de sites web — Design de marque —":["Digital strategy — Website design — Brand design — Digital strategy — Website design — Brand design —","استراتيجية رقمية — تصميم المواقع الإلكترونية — تصميم العلامات التجارية — استراتيجية رقمية — تصميم المواقع الإلكترونية — تصميم العلامات التجارية —"]
      ,"Création de sites web — Design de marque — Stratégie digitale — Création de sites web — Design de marque — Stratégie digitale —":["Website design — Brand design — Digital strategy — Website design — Brand design — Digital strategy —","تصميم المواقع الإلكترونية — تصميم العلامات التجارية — استراتيجية رقمية — تصميم المواقع الإلكترونية — تصميم العلامات التجارية — استراتيجية رقمية —"]
    };

    var textNodes=[];
    var walker=d.createTreeWalker(d.documentElement,NodeFilter.SHOW_TEXT);
    while(walker.nextNode())textNodes.push(walker.currentNode);
    var attributes=["aria-label","title","placeholder","content","alt"];
    var originalAttributes=[];
    d.querySelectorAll("*").forEach(function(element){
      attributes.forEach(function(name){
        if(element.hasAttribute(name))originalAttributes.push({element:element,name:name,value:element.getAttribute(name)});
      });
    });

    function translate(value,language){
      var source=value.trim(), entry=translations[source];
      if(!entry)return value;
      var start=value.indexOf(source), result=language==="fr"?source:entry[language==="ar"?1:0];
      return value.slice(0,start)+result+value.slice(start+source.length);
    }

    function setLanguage(language,save){
      currentLanguage=language;
      var direction=language==="ar"?"rtl":"ltr";
      d.documentElement.lang=language;
      d.documentElement.dir=direction;
      textNodes.forEach(function(node){
        if(!node.__languageOriginal)node.__languageOriginal=node.nodeValue;
        node.nodeValue=translate(node.__languageOriginal,language);
      });
      originalAttributes.forEach(function(attribute){
        attribute.element.setAttribute(attribute.name,translate(attribute.value,language));
      });
      buttons.forEach(function(button){
        var active=button.getAttribute("data-language")===language;
        button.setAttribute("aria-pressed",active?"true":"false");
      });
      d.dispatchEvent(new Event("languagechange"));
      if(save){
        try{window.localStorage.setItem("portfolio-language",language)}
        catch(error){console.warn("La langue choisie ne peut pas être mémorisée dans ce navigateur.",error)}
      }
    }

    var selectedLanguage="fr";
    try{
      var savedLanguage=window.localStorage.getItem("portfolio-language");
      if(savedLanguage==="ar"||savedLanguage==="fr"||savedLanguage==="en")selectedLanguage=savedLanguage;
    }catch(error){console.warn("La langue enregistrée ne peut pas être lue dans ce navigateur.",error)}
    setLanguage(selectedLanguage,false);
    buttons.forEach(function(button){
      button.addEventListener("click",function(){setLanguage(button.getAttribute("data-language"),true)});
    });
  })();

  /* ---------- Thème clair / sombre ---------- */
  (function(){
    var button=d.querySelector(".theme-toggle"), root=d.documentElement;
    if(!button)return;
    function setTheme(theme,save){
      root.setAttribute("data-theme",theme);
      var labels={
        fr:theme==="light"?"Activer le thème sombre":"Activer le thème clair",
        en:theme==="light"?"Enable dark theme":"Enable light theme",
        ar:theme==="light"?"تفعيل الوضع الداكن":"تفعيل الوضع الفاتح"
      };
      button.setAttribute("aria-label",labels[currentLanguage]);
      button.setAttribute("title",labels[currentLanguage]);
      button.setAttribute("aria-pressed",theme==="light"?"true":"false");
      if(save){
        try{window.localStorage.setItem("portfolio-theme",theme)}
        catch(error){console.warn("Le choix du thème ne peut pas être mémorisé dans ce navigateur.",error)}
      }
      d.dispatchEvent(new CustomEvent("themechange",{detail:{theme:theme}}));
    }
    try{
      if(window.localStorage.getItem("portfolio-theme")==="light")root.setAttribute("data-theme","light");
    }catch(error){console.warn("Le thème enregistré ne peut pas être lu dans ce navigateur.",error)}
    setTheme(root.getAttribute("data-theme")==="light"?"light":"dark",false);
    d.addEventListener("languagechange",function(){
      setTheme(root.getAttribute("data-theme")==="light"?"light":"dark",false);
    });
    button.addEventListener("click",function(){
      setTheme(root.getAttribute("data-theme")==="light"?"dark":"light",true);
    });
  })();

  /* ---------- Menu mobile ---------- */
  function setMenu(o){
    b.classList.toggle("menu-open",o);
    burger.setAttribute("aria-expanded",o);
    var labels={
      fr:o?"Fermer le menu":"Ouvrir le menu",
      en:o?"Close menu":"Open menu",
      ar:o?"إغلاق القائمة":"فتح القائمة"
    };
    burger.setAttribute("aria-label",labels[currentLanguage]);
  }
  burger.addEventListener("click",function(){setMenu(!b.classList.contains("menu-open"))});
  nav.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});

  /* ---------- Apparition au scroll ---------- */
  var els=d.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px 10% 0px",threshold:0});
    els.forEach(function(el){io.observe(el)});
  }else els.forEach(function(el){el.classList.add("in")});

  var y=d.getElementById("year");if(y)y.textContent=new Date().getFullYear();

  /* ---------- Aperçu plein écran des réalisations ---------- */
  (function(){
    var lightbox=d.getElementById("project-lightbox");
    if(!lightbox||typeof lightbox.showModal!=="function")return;
    var image=lightbox.querySelector(".lightbox-image");
    var close=lightbox.querySelector(".lightbox-close");
    var trigger=null;

    d.querySelectorAll("#works .work-img").forEach(function(button){
      button.addEventListener("click",function(){
        var preview=button.querySelector("img");
        if(!preview)return;
        trigger=button;
        image.src=preview.currentSrc||preview.src;
        image.alt=preview.alt;
        lightbox.showModal();
      });
    });

    close.addEventListener("click",function(){lightbox.close()});
    lightbox.addEventListener("click",function(e){
      if(e.target===lightbox)lightbox.close();
    });
    d.addEventListener("keydown",function(e){
      if(e.key==="Escape"&&lightbox.open){
        e.preventDefault();
        lightbox.close();
      }
    });
    lightbox.addEventListener("close",function(){
      image.removeAttribute("src");
      image.alt="";
      if(trigger)trigger.focus();
      trigger=null;
    });
  })();

  /* ---------- Hero : fond fluide animé (canvas) ---------- */
  (function(){
    var hero=d.querySelector(".hero"), cv=d.querySelector(".hero-canvas");
    if(!cv||!cv.getContext)return;
    var ctx=cv.getContext("2d"), w=0, h=0, dpr=1, running=true, t0=performance.now();
    var canvasBg=getComputedStyle(d.documentElement).getPropertyValue("--bg").trim()||"#0d0d0d";
    var blobs=[
      {c:"255,40,40",  r:.55, sx:.00021, sy:.00017, px:0,   py:1.2, ax:.30, ay:.25, a:.55},
      {c:"140,20,60",  r:.50, sx:.00016, sy:.00023, px:2,   py:.4,  ax:.35, ay:.30, a:.50},
      {c:"120,120,130",r:.60, sx:.00013, sy:.00019, px:4,   py:2.6, ax:.40, ay:.22, a:.30},
      {c:"255,120,60", r:.40, sx:.00025, sy:.00014, px:1,   py:3.3, ax:.28, ay:.32, a:.35},
      {c:"60,60,90",   r:.55, sx:.00018, sy:.00026, px:5,   py:.9,  ax:.33, ay:.28, a:.45}
    ];
    function resize(){
      dpr=Math.min(window.devicePixelRatio||1,2);
      w=hero.clientWidth; h=hero.clientHeight;
      cv.width=Math.round(w*dpr); cv.height=Math.round(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      draw(performance.now());
    }
    function draw(now){
      var t=now-t0;
      ctx.globalCompositeOperation="source-over";
      ctx.fillStyle=canvasBg; ctx.fillRect(0,0,w,h);
      ctx.globalCompositeOperation="lighter";
      var base=Math.max(w,h);
      for(var i=0;i<blobs.length;i++){
        var o=blobs[i];
        var x=w*(.5+o.ax*Math.sin(t*o.sx*6+o.px)+.12*Math.sin(t*o.sx*2.3+o.py));
        var yy=h*(.5+o.ay*Math.cos(t*o.sy*6+o.py)+.12*Math.cos(t*o.sy*2.1+o.px));
        var r=base*o.r*(1+.12*Math.sin(t*o.sx*4+i));
        var g=ctx.createRadialGradient(x,yy,0,x,yy,r);
        g.addColorStop(0,"rgba("+o.c+","+o.a*.5+")");
        g.addColorStop(.5,"rgba("+o.c+","+o.a*.18+")");
        g.addColorStop(1,"rgba("+o.c+",0)");
        ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      }
      // vagues douces en surimpression
      ctx.globalCompositeOperation="source-over";
      for(var k=0;k<3;k++){
        ctx.beginPath(); ctx.moveTo(0,h);
        for(var px=0;px<=w;px+=12){
          var yv=h*(.72+k*.08)+Math.sin(px*.006+t*.0006*(k+1)+k*2)*h*.04+Math.sin(px*.011-t*.0004+k)*h*.02;
          ctx.lineTo(px,yv);
        }
        ctx.lineTo(w,h); ctx.closePath();
        ctx.fillStyle="rgba(255,255,255,"+(.018+k*.008)+")"; ctx.fill();
      }
    }
    function loop(now){ if(running){draw(now);} requestAnimationFrame(loop); }
    window.addEventListener("resize",resize);
    d.addEventListener("themechange",function(){
      canvasBg=getComputedStyle(d.documentElement).getPropertyValue("--bg").trim()||"#0d0d0d";
      draw(performance.now());
    });
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(es){running=es[0].isIntersecting&&!d.hidden}).observe(hero);
    }
    d.addEventListener("visibilitychange",function(){running=!d.hidden});
    resize();
    if(!reduce)requestAnimationFrame(loop);
  })();

  /* ---------- Curseur lumineux ---------- */
  (function(){
    var glow=d.querySelector(".cursor-glow");
    if(!glow||window.matchMedia("(hover: none), (pointer: coarse)").matches)return;
    var tx=window.innerWidth/2, ty=window.innerHeight/2, cx=tx, cy=ty, active=false;
    window.addEventListener("mousemove",function(e){
      tx=e.clientX; ty=e.clientY;
      if(!active){active=true;cx=tx;cy=ty;glow.classList.add("on")}
    },{passive:true});
    d.addEventListener("mouseleave",function(){glow.classList.remove("on");active=false});
    d.addEventListener("mouseenter",function(){glow.classList.add("on");active=true});
    (function tick(){
      cx+=(tx-cx)*.12; cy+=(ty-cy)*.12;
      glow.style.transform="translate3d("+cx+"px,"+cy+"px,0)";
      requestAnimationFrame(tick);
    })();
  })();

  /* ---------- Formulaire → WhatsApp ---------- */
  (function(){
    var form=d.getElementById("contact-form"), note=d.getElementById("form-note");
    if(!form)return;
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var messages={
        fr:{invalid:"Merci de remplir correctement les champs obligatoires.",opening:"Ouverture de WhatsApp…",newMessage:"Nouveau message depuis le site",name:"Nom",email:"E-mail",phone:"Téléphone",unknown:"non renseigné",message:"Message"},
        en:{invalid:"Please complete the required fields correctly.",opening:"Opening WhatsApp…",newMessage:"New message from the website",name:"Name",email:"Email",phone:"Phone",unknown:"not provided",message:"Message"},
        ar:{invalid:"يرجى ملء الحقول المطلوبة بشكل صحيح.",opening:"جارٍ فتح واتساب…",newMessage:"رسالة جديدة من الموقع",name:"الاسم",email:"البريد الإلكتروني",phone:"الهاتف",unknown:"غير متوفر",message:"الرسالة"}
      }[currentLanguage];
      var f=form.elements, ok=true;
      ["nom","email","message"].forEach(function(n){
        var el=f[n], bad=!el.value.trim() || (n==="email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
        el.classList.toggle("is-error",bad); if(bad)ok=false;
      });
      if(!ok){note.textContent=messages.invalid;return}
      var nom=f.nom.value.trim(), email=f.email.value.trim(), tel=f.tel.value.trim(), msg=f.message.value.trim();
      var text=
        "*"+messages.newMessage+"*\n\n"+
        "*"+messages.name+" :* "+nom+"\n"+
        "*"+messages.email+" :* "+email+"\n"+
        "*"+messages.phone+" :* "+(tel||messages.unknown)+"\n\n"+
        "*"+messages.message+" :*\n"+msg;
      var url="https://api.whatsapp.com/send?phone="+WHATSAPP_NUMBER+"&text="+encodeURIComponent(text);
      note.textContent=messages.opening;
      var win=window.open(url,"_blank","noopener");
      if(!win)window.location.href=url; // repli si la fenêtre est bloquée
      form.reset();
    });
    form.addEventListener("input",function(e){e.target.classList.remove("is-error")});
  })();

  /* ---------- Bouton social flottant ---------- */
  (function(){
    var box=d.getElementById("social"); if(!box)return;
    var btn=box.querySelector(".social-toggle");
    function set(o){
      box.classList.toggle("open",o);
      btn.setAttribute("aria-expanded",o);
      btn.setAttribute("aria-label",o?"Fermer les réseaux sociaux":"Ouvrir les réseaux sociaux");
    }
    btn.addEventListener("click",function(){set(!box.classList.contains("open"))});
    d.addEventListener("click",function(e){if(!box.contains(e.target))set(false)});
    d.addEventListener("keydown",function(e){if(e.key==="Escape"){set(false);setMenu(false)}});
  })();

  /* ---------- Menu mobile : se ferme si on repasse en desktop ---------- */
  window.addEventListener("resize",function(){if(window.innerWidth>900)setMenu(false)});

})();


document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');

  if (!themeToggleBtn) return;

  function getSavedTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
    }
  }

  const savedTheme = getSavedTheme();
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  function toggleTheme(e) {
    if (e) e.preventDefault();
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');
    saveTheme(isDark ? 'dark' : 'light');
  }

  themeToggleBtn.addEventListener('click', toggleTheme);
});