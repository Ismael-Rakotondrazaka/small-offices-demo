<template>
  <section class="">
    <div
      :style="{
        backgroundColor: '#e8eefc',
      }"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <n-h1 class="font-roslindale-bold">
          Politique de confidentialité
        </n-h1>
      </div>
    </div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Navigation -->
        <nav class="mb-8 lg:mb-0 lg:w-1/2 xl:w-1/3">
          <n-ul
            align-text
            class="grid gap-2 lg:gap-4"
          >
            <n-li>
              <a
                href="#collect"
                class="text-blue-500"
              >Données personnelles collectées</a>
            </n-li>
            <n-li>
              <a
                href="#use"
                class="text-blue-500"
              >Finalités des données</a>
            </n-li>
            <n-li>
              <a
                href="#security"
                class="text-blue-500"
              >Sécurité</a>
            </n-li>
            <n-li>
              <a
                href="#droits"
                class="text-blue-500"
              >Vos droits</a>
            </n-li>
            <n-li>
              <a
                href="#desabo-newsletter"
                class="text-blue-500"
              >Désabonnement newsletter</a>
            </n-li>
            <n-li>
              <a
                href="#duree"
                class="text-blue-500"
              >Durée de conservation des données personnelles</a>
            </n-li>
            <n-li>
              <a
                href="#cookies"
                class="text-blue-500"
              >Politique de gestion des cookies</a>
            </n-li>
            <n-li>
              <a
                href="#evolution"
                class="text-blue-500"
              >Evolution de notre Politique de Confidentialité</a>
            </n-li>
            <n-li>
              <a
                href="#q-and-a"
                class="text-blue-500"
              >Questions &amp; retours à propos de notre politique de confidentialité</a>
            </n-li>
          </n-ul>
        </nav>
        <!-- Main Content -->
        <div class="lg:w-2/3 xl:w-3/4">
          <n-h3>Effectif depuis le : 14/06/2021</n-h3>
          <n-p>
            Cette Politique de Confidentialité s’applique au site petitsbureaux.fr possédé et géré par Petits Bureaux SAS. Cette Politique de confidentialité décrit comment Petits Bureaux collecte, utilise, partage et sécurise les informations personnelles fournies par ses utilisateurs. Elles décrivent également vos possibilités d’utilisation, d’accès et de rectification de vos informations personnelles.
          </n-p>
          <n-p>
            Dans une logique de respect de la vie privée de ses Utilisateurs, Petits Bureaux s’engage à ce que la collecte et le traitement d’informations personnelles, effectués au sein du site petitsbureaux.fr, soient effectués conformément à la loi n°78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, dite Loi « Informatique et Libertés » et au Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016, relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données
          </n-p>
          <n-h2 id="collect">
            Données personnelles collectées
          </n-h2>
          <n-p>
            Vous pouvez visiter notre site, sans communiquer une quelconque donnée personnelle
            <span>(c'est-à-dire toute information se rapportant à une personne physique identifiée ou identifiable)</span>.
          </n-p>
          <n-p>
            Toutefois pour vous inscrire et profiter de certains de nos services, il vous sera demandé de communiquer certaines données à caractère personnel. Dans ces cas, la communication de vos données à caractère personnel est totalement volontaire ; toutefois, si vous ne souhaitez pas communiquer ces Données à caractère personnel, certains de nos services peuvent ne pas être disponibles.
          </n-p>
          <n-p>
            Concrètement, nous collectons les données personnelles suivantes :
          </n-p>
          <n-p>
            Données personnelles nécessaires pour l’utilisation de la plateforme Petits Bureaux et la création d’un compte :
          </n-p>
          <n-ul :style="{ listStyle: 'disc' }">
            <n-li>Informations de contact : nom, prénom, adresse email, numéro de téléphone, poste, photo</n-li>
            <n-li>Informations de votre organisation : nom de l’organisation, numéro de téléphone, adresse</n-li>
            <n-li>Identifiants uniques : adresse email, mot de passe, identifiant unique de réseau social</n-li>
          </n-ul>
          <n-p>
            Données personnelles nécessaires pour la facturation :  nom, prénom, adresse email, adresse postale.
          </n-p>
          <n-p>
            Lorsque c’est le cas, nous n’utilisons ces données que pour la raison spécifique pour laquelle ces informations nous ont été transmises. Si vous pensez que des informations personnelles vous concernant nous ont été transmises dans ce cadre par quelqu’un d’autre et que vous souhaitez qu’elles soient retirées de notre base de données, veuillez nous contacter selon le processus décrit plus bas.
          </n-p>
          <n-h2 id="use">
            Finalités des données
          </n-h2>
          <n-p>
            Les informations personnelles précédemment citées sont utilisées pour les raisons suivantes :
          </n-p>
          <n-ul :style="{ listStyle: 'disc' }">
            <n-li>authentification sur la plateforme</n-li>
            <n-li>identification</n-li>
            <n-li>contact (entre nous et nos utilisateurs, ainsi que pour la mise en relation sur notre plateforme)</n-li>
            <n-li>facturation</n-li>
            <n-li>fourniture et amélioration de la plateforme petitsbureaux.fr</n-li>
            <n-li>suivi commercial</n-li>
          </n-ul>
          <n-p>
            Ces données ne pourront pas être utilisées pour une autre raison que celles citées précédemment, et les raisons de la collecte des données personnelles ne pourront pas évoluer après la collecte.
          </n-p>
          <n-p>
            Base juridique du traitement : consentement de la personne concernée
          </n-p>
          <n-h3>Suivi commercial &amp; opt-out</n-h3>
          <n-p>
            En vous inscrivant sur petitsbureaux.fr, vous avez à tout moment la possibilité de signaler que vous ne voulez plus être contacté par notre équipe commerciale dans la rubrique “Notifications” de votre compte.
          </n-p>
          <n-h3>Partage des données</n-h3>
          <n-h4>Partage avec les prestataires de services</n-h4>
          <n-p>
            Nous partageons vos données avec nos prestataires qui nous fournissent des services sur notre demande et dans le but de nous aider dans notre activité commerciale. Ces organisations ne sont autorisées à utiliser vos données que pour et dans le cadre du service que nous leur commanditons. Pour précision, on entend par “utilisation” le fait de collecter les données que nous leurs transmettons et que ces parties tierces se contentent de nous présenter dans le cadre du service commandé.
          </n-p>
          <n-p>Ces services incluent :</n-p>
          <n-ul :style="{ listStyle: 'disc' }">
            <n-li>Suivi commercial</n-li>
            <n-li>Facturation</n-li>
            <n-li>Envoi informatif</n-li>
            <n-li>Recherche &amp; analyse</n-li>
            <n-li>Infrastructure technique</n-li>
            <n-li>Emails</n-li>
          </n-ul>
          <n-p>
            Ces prestataires sont contractuellement tenus de protéger vos données personnelles et n'y ont accès que pour effectuer les tâches mentionnées ci-dessus. Vous retrouverez leur politique de confidentialité en suivant :
          </n-p>
          <n-ul :style="{ listStyle: 'disc' }">
            <n-li>Pipedrive (suivi commercial) : <a href="https://support.pipedrive.com/hc/en-us/articles/360000335129-Pipedrive-and-GDPR">https://support.pipedrive.com/hc/en-us/articles/360000335129-Pipedrive-and-GDPR</a></n-li>
            <n-li>Factupro : <a href="https://www.facturation.pro/a-propos/privacy">https://www.facturation.pro/a-propos/privacy</a></n-li>
            <n-li>Uploadcare : photo personnelle : <a href="https://uploadcare.com/about/privacy_policy_20180525/">https://uploadcare.com/about/privacy_policy_20180525/</a> &amp; <a href="https://uploadcare.com/about/gdpr/">https://uploadcare.com/about/gdpr/</a></n-li>
            <n-li>Ringover (solution de centre d'appel) : <a href="https://www.ringover.com/fr/confidentialite">https://www.ringover.com/fr/confidentialite</a></n-li>
            <n-li>Mailchimp (solution de publipostage) : <a href="https://kb.mailchimp.com/fr/accounts/management/about-the-general-data-protection-regulation">https://kb.mailchimp.com/fr/accounts/management/about-the-general-data-protection-regulation</a></n-li>
            <n-li>Intercom (solution d'aide et de chat en ligne) : <br><a href="https://docs.intercom.com/pricing-privacy-and-terms/data-protection/how-intercom-complies-with-gdpr">https://docs.intercom.com/pricing-privacy-and-terms/data-protection/how-intercom-complies-with-gdpr</a></n-li>
            <n-li>Outfunnel (fournisseur de services tiers afin de créer des listes de distribution par e-mail et de gérer des campagnes marketing) : <a href="https://support.outfunnel.com/en/articles/3245435-does-outfunnel-comply-with-gdpr">https://support.outfunnel.com/en/articles/3245435-does-outfunnel-comply-with-gdpr</a></n-li>
          </n-ul>
          <n-h4>Politique d'accès des employés</n-h4>
          <n-p>
            Seulement une partie restreinte des employés a accès aux données sur les différents serveurs. Les employés peuvent accéder aux données clients seulement sur autorisation préalable. Une attention particulière est portée à la bonne balance entre une infrastructure sécurisée et un support efficace.
          </n-p>
          <n-h2 id="security">
            Sécurité
          </n-h2>
          <n-p>
            La sécurité de vos informations personnelles est importante pour nous. Nous respectons de hauts standards de sécurité pour protéger les données qui nous sous soumises, tant pendant la transmission qu’une fois qu’elles ont été reçues.
          </n-p>
          <n-p>
            Les serveurs utilisés par petitsbureaux.fr sont hébergés dans le centre de données de Google situé à Saint-Ghislain en Belgique (<a href="https://www.google.fr/about/datacenters/locations/st-ghislain/">https://www.google.fr/about/datacenters/locations/st-ghislain/</a>) via les services de Google Cloud Platform. Ce centre de données possède l'accréditation SSAE 16 SOC 2 Type 2. L'audit SOC 2 (Service Organization Controls) de l'AICPA (American Institute of Certified Public Accountants) encadre les "principes et critères de confiance" relatifs à la sécurité, la disponibilité des services, l'intégrité du traitement des données et la confidentialité. Le rapport SOC 2 pour Google Cloud Platform est disponible sous NDA.
          </n-p>
          <n-p>
            L'accès au code source et aux données personnelles est restreint à nos employés ou partenaires qui en auraient besoin dans le cadre de l'opération, le développement ou le suivi de notre service. Ces personnes sont engagées par contrat au respect de la confidentialité de ces données et sont sujettes à des sanctions disciplinaires si cette confidentialité venait à être transgressée.
          </n-p>
          <n-p>
            Ce service fournit de multiples niveaux de réplications et de sécurité afin d'assurer une disponibilité maximale ainsi qu'une forte garantie de protection de données.
          </n-p>
          <n-p>Cela inclut :</n-p>
          <n-ul :style="{ listStyle: 'disc' }">
            <n-li>Serveurs redondants pour l'API et l'interface Web.</n-li>
            <n-li>Protocoles sécurisés (SSL / TLS) à travers l'API, l'interface Web ainsi que toute communication avec les systèmes tiers.</n-li>
            <n-li>Cryptage 256-bit SSL pour l'API et l'interface Web.</n-li>
            <n-li>Tous les mots de passe sont cryptés sur les serveurs et les bases de données.</n-li>
            <n-li>Les systèmes d'exploitations utilisés sur les serveurs sont régulièrement mis à jour avec les dernières mises à jour de sécurité.</n-li>
            <n-li>La surveillance externe du service est mise en place via des outils dédiés.</n-li>
          </n-ul>
          <n-h4>Communication des données, sécurité et rétention</n-h4>
          <n-p>
            Tous les accès aux interfaces de petitsbureaux.fr sont sécurisés via SSL (HTTPS), assurant ainsi que les informations sont cryptées. Par ailleurs, nous fournissons des connexions TLS et HTTPS à l'API de notre service ainsi qu'aux connexions aux services tiers. Les mots de passe sont encodés dans la base de données, empêchant même notre équipe de pouvoir les lire.
          </n-p>
          <n-h4>Sauvegardes et redondance</n-h4>
          <n-p>
            Tous les services tiers que nous utilisons ainsi que Google Cloud Platform fournissent un service de sauvegarde de données et de redondances de données permettant d'éviter toute perte suite à une panne, qu'elle soit logicielle, réseau ou matérielle.
          </n-p>
          <n-p>
            Veuillez vous référer aux documents fournis par Google pour avoir plus de détails sur ces sujets:
            <a href="https://privacy.google.com/intl/fr_fr/businesses/compliance/">https://privacy.google.com/intl/fr_fr/businesses/compliance/</a>
            et
            <a href="https://cloud.google.com/security/compliance/">https://cloud.google.com/security/compliance/</a>.
          </n-p>
          <n-h2 id="droits">
            Vos droits
          </n-h2>
          <n-p>
            Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée et au Règlement européen n°2016/679/UE du 27 avril 2016, vous bénéficiez d’un droit d’accès, de rectification, de portabilité et d’effacement de ses données personnelles ou encore de limitation du traitement.
          </n-p>
          <n-ul :style="{ listStyle: 'disc' }">
            <n-li>
              <span>Accès et gestion de vos informations</span> : Si vous en faites la demande, nous vous informerons si nous détenons certaines de vos informations personnelles.
            </n-li>
            <n-li>
              <span>Rectification</span> : Vous serez alors en mesure d’accéder, corriger ou de demander la suppression de vos données personnelles en vous connectant ou en nous contactant à l’adresse indiquée plus bas. Nous vous répondrons alors selon la nature de votre requête dans un délai raisonnable le temps de procéder à certaines vérifications. Dans certaines circonstances, notamment légales ou pour continuer à assurer une certaine qualité de service, nous serons susceptibles de conserver des données.
            </n-li>
            <n-li>
              <span>Portabilité</span> : Vous pouvez demander des copies de vos informations personnelles ou des informations sur la manière dont nous traitons vos informations personnelles, ou encore de demander des copies des informations personnelles que vous nous avez fournies dans un format structuré, couramment utilisé et lisible par une machine, et/ou de demander que nous transmettions ces informations à un autre prestataire de services (lorsque cela est techniquement faisable).
            </n-li>
            <n-li>
              <span>Effacement</span> et/ou limitation de traitement : L’Utilisateur peut également, pour des motifs légitimes, s’opposer au traitement des données personnelles le concernant. Il peut, sous réserve de la production d’un justificatif d’identité valide, exercer ses droits en contactant : donnees@petitsbureaux.fr
            </n-li>
          </n-ul>
          <n-p>
            L’Utilisateur reste en droit d’introduire une réclamation auprès d’une autorité de contrôle, en France la CNIL.
          </n-p>
          <n-h2 id="desabo-newsletter">
            Désabonnement newsletter
          </n-h2>
          <n-p>
            Nos utilisateurs ainsi que nos visiteurs ont la possibilité de s’inscrire à notre newsletter. Si vous ne souhaitez plus recevoir de newsletter de notre part, vous pouvez vous en désinscrire à l’aide du lien “désinscription” situé en bas de chaque e-mail ou en faire la demande en nous contactant à l’aide des informations fournies plus bas
          </n-p>
          <n-h2 id="duree">
            Durée de conservation des données personnelles
          </n-h2>
          <n-p>
            Vos données personnelles seront conservées aussi longtemps que nécessaire et pour la durée nécessaire aux opérations pour lesquelles elles ont été collectées, et plus généralement pendant toute la durée de prescription applicable afin de permettre à la société de faire face à une éventuelle action en justice.
          </n-p>
          <n-h2 id="cookies">
            Politique de gestion des cookies
          </n-h2>
          <n-p>
            Lorsque vous visitez le site de Petits Bureaux vous recevez automatiquement des cookies. Ces derniers nous permettent d’améliorer la navigation de nos utilisateurs en récoltant des données statistiques et en analysant leur comportement. Cela inclut le navigateur utilisé, le support, le système d’exploitation, les pages visitées, d’entrée et de sortie. Ces données sont parfaitement anonymes. Elles sont utilisées dans le but d’analyser les tendances d’utilisation du site et de l’administrer.
          </n-p>
          <n-p>
            Vous pouvez contrôler l’utilisation de cookies de manière individuelle dans les paramètres du navigateur internet que vous utilisez, mais si vous désactivez l’utilisation de cookies, cela sera susceptible de limiter votre utilisation de certaines fonctionnalités du site. Vous pourrez lire plus d’informations sur les cookies utilisés plus bas.
          </n-p>
          <n-h3>Qu’est-ce qu’un cookie ?</n-h3>
          <n-p>
            Les cookies sont de petits fichiers stockés sur votre ordinateur ou votre mobile lorsque vous accédez à notre site web. Ils nous sont ensuite renvoyés à chacune de vos visites, et nous permettent par exemple de vous identifier ou de stocker vos critères de recherche. Nous pouvons ainsi simplifier votre navigation et vous faciliter la tâche.
          </n-p>
          <n-p>
            Les cookies ne sont PAS des virus ou des logiciels espions, et ne compromettent en rien la sécurité et la stabilité de vos appareils.
          </n-p>
          <n-h3>Consentement et configuration des cookies</n-h3>
          <n-p>
            Vous pouvez configurer les cookies lors de votre arrivée sur le Site à l’aide de l’outil dédié Axeptio.
          </n-p>
          <n-h3>Pourquoi employons-nous des cookies</n-h3>
          <n-p>
            Les cookies de notre site web peuvent avoir été installés par nous ou par des tiers, tels que des publicitaires.
          </n-p>
          <n-p>
            Nous les utilisons pour retenir les informations des formulaires que vous remplissez sur notre site ou vos critères de recherche, pour que vous n’ayez pas à les saisir à nouveau. Nous les utilisons aussi pour optimiser votre navigation sur notre site et vous donner le plus rapidement possible l’information que vous recherchez.
          </n-p>
          <n-p>Nos cookies sont :</n-p>
          <n-ul :style="{ listStyle: 'disc' }">
            <n-li>PHPSESSID : permet d’enregistrer vos variables de sessions.</n-li>
            <n-li>userId : permet d’enregistrer vos variables de sessions.</n-li>
          </n-ul>
          <n-p>Nos cookies utilisés par des tiers sont :</n-p>
          <n-ul :style="{ listStyle: 'disc' }">
            <n-li>_ga : un cookies utilisé par Google Analytics.</n-li>
            <n-li>_gat : un cookies utilisé par Google Analytics.</n-li>
            <n-li>_gid : un cookies utilisé par Google Analytics.</n-li>
            <n-li>Wp-settings-39 : un cookie utilisé par WordPress.</n-li>
            <n-li>Wp-settings-time-39 : un cookie utilisé par WordPress.</n-li>
            <n-li>Mp_*_mixpanel : un cookie utilisé par Mixpanel.</n-li>
          </n-ul>
          <n-p>
            Certains partenaires peuvent déposer des cookies sur petitsbureaux.fr. Petits Bureaux accepte que certains partenaires enregistrent des cookies, par exemple pour l’intégration sur notre site de certaines fonctionnalités ou modules. Petits Bureaux n’est pas responsable des cookies enregistrés par ces partenaires ainsi que de l’utilisation des données collectées par ces partenaires. Pour en savoir plus sur les cookies de nos partenaires, veuillez consulter la politique de cookies des partenaires cités.
          </n-p>
          <n-h2 id="evolution">
            Evolution de notre Politique de Confidentialité
          </n-h2>
          <n-p>
            Nous sommes susceptibles de mettre à jour notre Politique de Confidentialité pour y refléter les évolutions du traitement de vos données personnelles. Nous vous informerons par email de tout changement majeur (à l’adresse indiquée dans votre compte). Nous vous encourageons à consulter régulièrement cette page pour suivre l’évolution de notre Politique de Confidentialité.
          </n-p>
          <n-h2 id="q-and-a">
            Questions &amp; retours à propos de notre politique de confidentialité
          </n-h2>
          <n-p>
            Pour toute question ou retour à propos de notre Politique de Confidentialité, merci de nous contacter à l’adresse suivante : donnees@petitsbureaux.fr ou à Petits Bureaux SAS, 10 rue de Penthièvre, 75008 Paris.
          </n-p>
        </div>
      </div>
    </div>
  </section>
</template>
