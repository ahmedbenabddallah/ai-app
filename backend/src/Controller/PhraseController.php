<?php
namespace App\Controller;

use App\Entity\Phrase;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class PhraseController extends AbstractController
{
    #[Route('/api/phrases', name: 'api_phrase_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $phrase = new Phrase();
        $phrase->setContent($data['content']);
        $phrase->setSentiment($this->analyzeSentiment($data['content']));
        $phrase->setCreatedAt(new \DateTime());

        $em->persist($phrase);
        $em->flush();

        return $this->json([
            'id' => $phrase->getId(),
            'content' => $phrase->getContent(),
            'sentiment' => $phrase->getSentiment()
        ]);
    }

    #[Route('/api/phrases', name: 'api_phrase_list', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $phrases = $em->getRepository(Phrase::class)->findAll();
        $data = [];
        foreach ($phrases as $phrase) {
            $data[] = [
                'id' => $phrase->getId(),
                'content' => $phrase->getContent(),
                'sentiment' => $phrase->getSentiment(),
                'createdAt' => $phrase->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }
        return $this->json($data);
    }

    private function analyzeSentiment(string $content): string
    {
        return stripos($content, 'bien') !== false ? 'positif' : 'neutre';
    }
}